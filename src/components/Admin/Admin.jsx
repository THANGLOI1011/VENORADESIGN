import React, { useEffect, useState } from 'react';
import { getDatabase, ref, set, get, remove, update, push } from 'firebase/database';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { Navigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import './Admin.css';
import { FaWindowClose } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const Admin = () => {
  const [form, setForm] = useState({
    name: '',
    id: '',
    year: '',
    add: '',
    deps: '',
    image: '',
    size: '',
    images: ['']
  });
  const [isFormOpen,setIsFormOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [projects, setProjects] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [isAdminRightVisible,setIsAdminRightVisible] = useState(false);
// video tiktok 
const [tiktokForm, setTiktokForm] = useState({
  embedCode: ''
});
const [tiktokVideos, setTiktokVideos] = useState([]);
const [isTiktokFormOpen, setIsTiktokFormOpen] = useState(false); // Quản lý trạng thái mở form TikTok
const [isTiktokTableVisible, setIsTiktokTableVisible] = useState(false); // Quản lý trạng thái hiển thị bảng TikTok
const toggleTiktokForm = () => {
  setIsTiktokFormOpen(!isTiktokFormOpen); // Đóng/mở form TikTok
  if (!isTiktokFormOpen) {
    setTiktokForm({ embedCode: '' }); // Reset form khi mở
  }
};
useEffect(() => {
  // Lấy danh sách video TikTok từ Firebase
  const fetchTiktokVideos = async () => {
    const db = getDatabase();
    const tiktokRef = ref(db, 'tiktokVideos');
    const snapshot = await get(tiktokRef);

    if (snapshot.exists()) {
      setTiktokVideos(Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data })));
    }
  };

  fetchTiktokVideos();
}, []);
const extractCleanTitle = (embedCode) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = embedCode;

  // Tìm thẻ <section> trong blockquote
  const sectionElement = tempDiv.querySelector('blockquote section');
  if (sectionElement) {
    const fullText = sectionElement.textContent;

    // Loại bỏ tên người dùng (@...) và nhạc nền (♬ ...)
    const cleanedText = fullText
      .replace(/@\S+/g, "") // Loại bỏ tên người dùng (@boisad1011)
      .replace(/♬.*/g, "") // Loại bỏ nhạc nền (♬ nhạc nền - Nguyễn Thắng Lợi)
      .replace(/#\S+/g, "") // Loại bỏ hastag (#...)
      .trim();

    return cleanedText;
  }
  return "Không có tiêu đề";
};
const handleTiktokInputChange = (e) => {
  const { name, value } = e.target;
  setTiktokForm({ ...tiktokForm, [name]: value });
};

const handleTiktokSubmit = async (e) => {
  e.preventDefault();

  if (!tiktokForm.embedCode.trim()) {
    alert('Vui lòng nhập thẻ blockquote của TikTok.');
    return;
  }

  const db = getDatabase();
  const tiktokRef = ref(db, 'tiktokVideos');
  const newVideoRef = push(tiktokRef); // Tạo một ID mới trong Firebase

  const videoData = {
    id: newVideoRef.key, // Lấy ID tự động từ Firebase
    embedCode: tiktokForm.embedCode // Lưu toàn bộ nội dung thẻ blockquote
  };

  try {
    await set(newVideoRef, videoData); // Lưu dữ liệu vào Firebase
    alert('Video TikTok đã được thêm thành công!');
    setTiktokVideos([...tiktokVideos, videoData]); // Cập nhật danh sách video
    setTiktokForm({ embedCode: '' }); // Reset form
    setIsTiktokFormOpen(false); // Đóng form sau khi thêm video
  } catch (error) {
    console.error('Lỗi khi thêm video TikTok:', error);
    alert('Không thể thêm video TikTok. Vui lòng thử lại.');
  }
};
const handleTiktokDelete = async (id) => {
  const db = getDatabase();
  const videoRef = ref(db, `tiktokVideos/${id}`);

  try {
    await remove(videoRef);
    alert('Video TikTok đã được xóa thành công!');
    setTiktokVideos(tiktokVideos.filter((video) => video.id !== id));
  } catch (error) {
    console.error('Lỗi khi xóa video TikTok:', error);
    alert('Không thể xóa video TikTok. Vui lòng thử lại.');
  }
};

  // Xác thực người dùng
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserName(user.email);

        const db = getDatabase();
        const adminRef = ref(db, `admins/${user.uid}`);
        get(adminRef).then((snapshot) => {
          if (snapshot.exists() && snapshot.val() === true) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        }).catch((error) => {
          console.error('Lỗi admin hoạt động ', error);
          setIsAdmin(false);
        });
      } else {
        setIsAuthenticated(false);
      }
      setAuthChecked(true);
    });

    // Lấy danh sách dự án
    const fetchProjects = () => {
      const db = getDatabase();
      const projectsRef = ref(db, 'products');
      get(projectsRef).then((snapshot) => {
        if (snapshot.exists()) {
          const projectsData = snapshot.val();
          setProjects(Object.values(projectsData));
        }
      }).catch((error) => {
        console.error('Error fetching projects:', error);
      });
    };

    fetchProjects();

    return () => unsubscribe();
  }, []);
 
  // Cập nhật trường dữ liệu
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...form.images];
    newImages[index] = value;
    setForm({ ...form, images: newImages });
  };

  const addImageField = () => {
    setForm({ ...form, images: [...form.images, ''] });
  };

  const removeImageField = (index) => {
    const newImages = form.images.filter((_, i) => i !== index);
    setForm({ ...form, images: newImages });
  };
// 
const toggleForm = () => {
  if (editingProjectId) return; 
  setIsFormOpen(!isFormOpen); // Đóng/mở form khi nhấn nút
  if (!isFormOpen) {
    // Reset form khi mở
    setForm({
      name: '',
      id: '',
      year: '',
      add: '',
      deps: '',
      image: '',
      size: '',
      images: ['']
    });
    setEditingProjectId(null);
  }
};
  // Thêm hoặc cập nhật dự án
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Kiểm tra tất cả các trường
    const { name, id, year, add, deps, image, size, images } = form;
    if (!name || !id || !year || !add || !deps || !image || !size || images.some(img => img.trim() === '')) {
      alert('Vui lòng điền đầy đủ thông tin vào tất cả các trường.');
      return;
    }
  
    if (!isAdmin) {
      alert('Bạn không có quyền thêm hoặc chỉnh sửa dữ liệu.');
      return;
    }
  
    const db = getDatabase();
    const projectData = {
      name,
      id,
      year,
      add,
      deps,
      image,
      size,
      images: images.filter(img => img.trim())
    };
  
    if (editingProjectId) {
      update(ref(db, `products/${editingProjectId}`), projectData)
        .then(() => {
          alert('Dự án đã được cập nhật thành công!');
          setEditingProjectId(null);
          setForm({
            name: '',
            id: '',
            year: '',
            add: '',
            deps: '',
            image: '',
            size: '',
            images: ['']
          });
          setProjects(projects.map(proj => (proj.id === editingProjectId ? projectData : proj)));
          window.location.reload();
        })
        .catch((error) => {
          console.error('Lỗi khi cập nhật dự án:', error);
          alert('Không thể cập nhật dự án. Vui lòng thử lại.');
        });
    } else {
      set(ref(db, `products/${form.id}`), projectData)
        .then(() => {
          alert('Dự án đã được thêm thành công!');
          setForm({
            name: '',
            id: '',
            year: '',
            add: '',
            deps: '',
            image: '',
            size: '',
            images: ['']
          });
          setProjects([...projects, projectData]);
          window.location.reload();
        })
        .catch((error) => {
          console.error('Lỗi khi lưu dữ liệu vào cơ sở dữ liệu:', error);
          alert('Không thể thêm dự án. Vui lòng thử lại.');
        });
    }
  };
  

  // Chỉnh sửa dự án
  const handleEdit = (project) => {
    setForm(project);
    setEditingProjectId(project.id);
    setIsFormOpen(true);
    window.scrollTo(0, document.body.scrollHeight);
  };

  // Xóa dự án
  const handleDelete = (id) => {
    if (!isAdmin) {
      alert('You do not have permission to delete data.');
      return;
    }

    const db = getDatabase();
    const projectRef = ref(db, `products/${id}`);
    remove(projectRef)
      .then(() => {
        alert('Project deleted successfully!');
        // Cập nhật danh sách dự án sau khi xóa
        setProjects(projects.filter(project => project.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting project:', error);
        alert('Failed to delete project. Please try again.');
      });
  };
  const toggleAdminRight = () => {
    setIsAdminRightVisible(!isAdminRightVisible);
    if (!isAdminRightVisible) {
      setTimeout(() => {
        document.getElementById("admin-right").scrollIntoView({ behavior: "smooth" });
      }, 200); // Delay nhỏ để UI cập nhật trước khi scroll
    }
  }
  // Đăng xuất
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert('Thành công.');
        window.location.href = '/login'; // Chuyển hướng về trang đăng nhập
      })
      .catch((error) => {
        console.error('Lỗi ', error);
        alert('Thất bại,vui lòng thử lại.');
      });
  };

  if (!authChecked) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return null;
  }
  return (
    <div className='box-container'>
      <div className='paddings innerWidth a-container '>
      <div className="admin-container ">
      <h1 className='flexCenter '>Venora Admin</h1>
      <div className="btn-logout">
      {userName && <p className='flexCenter'>Xin Chào, {userName}!</p>}
        <button onClick={handleLogout} className="logout-button"><FiLogOut /></button>
      </div>
      <div className="admin-projects">
        <div className='admin-left'>
        <span>Tổng dự án<br /><div className='text-small'>Tổng số dự án có trên website</div><div className='text-all-project'>{projects.length}</div><p onClick={toggleAdminRight} id='detail'>{isAdminRightVisible ? "Ẩn chi tiết" : "Xem chi tiết"}</p></span>
        <span>Tổng dự án tiêu biểu<br /><div className='text-small'>Tổng số dự án tiêu biểu có trên website</div><div className='text-all-project'>{projects.slice(0,5).length}</div> </span>
        <span>
  Tổng video
  <br />
  <div className='text-small'>Tổng số video có trên website</div>
  <div className='text-all-project'>{tiktokVideos.length}</div>
  <p
  onClick={() => {
    setIsTiktokTableVisible(!isTiktokTableVisible);
    if (!isTiktokTableVisible) {
      setTimeout(() => {
        document.getElementById("admin-right-tiktok").scrollIntoView({ behavior: "smooth" });
      }, 200); // Delay nhỏ để đảm bảo UI cập nhật trước khi cuộn
    }
  }}
  id="detail"
>
  {isTiktokTableVisible ? "Ẩn chi tiết" : "Xem chi tiết"}
</p>
</span>
        
        
        </div>
        <div className='admin-right-container'>
            {/* 1 */}
            <div id='admin-right' className={`admin-rightl ${isAdminRightVisible ? '' : 'hidden'}`}>
        <div className='admin-right'>
          <div className='admin-right-title'>
          <h2>Tất cả các dự án <div className='text-small'>Tổng dự án đang hoạt động</div></h2>
          <h3 onClick={toggleForm} id="btn-create" className="btn-toggle-form">
          <div className="icon-plus">
            {isFormOpen ? <FaWindowClose /> : <FaPlus />}
          </div>
            
        </h3>
          </div>
        {projects.map((project) => (
          <div key={project.id} className="project-item">
            {/* <img src={project.image} alt={project.name} /> */}
            <h3>{project.name}</h3>
            {/* <p>ID: {project.id}</p> */}
            {/* <p>Năm: {project.year}</p> */}
            {/* <p>Địa chỉ: {project.add}</p> */}
            {/* <p>Mô tả: {project.deps}</p> */}
            {/* <p>Diện tích: {project.size}</p> */}
            
            <div className='btn-product'>
              <button id='edit' onClick={() => handleEdit(project)} className="btn-edit"><FaEdit /></button>
              <button id='delete' onClick={() => handleDelete(project.id)} className="btn-delete"><RiDeleteBin6Fill /></button>
            </div>
          </div>
        ))}
        </div>
        </div>
        {/* 2 */}
        <div id='admin-right-tiktok' className={`admin-rightl ${isTiktokTableVisible ? '' : 'hidden'}`}>
  <div className='admin-right'>
    <div className='admin-right-title'>
      <h2>Video TikTok <div className='text-small'>Tổng video đang hoạt động</div></h2>
      <h3 onClick={() => setIsTiktokFormOpen(!isTiktokFormOpen)} id="btn-create" className="btn-toggle-form">
        <div className="icon-plus">
          {isTiktokFormOpen ? <FaWindowClose /> : <FaPlus />}
        </div>
      </h3>
    </div>
    {tiktokVideos.map((video) => (
      <div key={video.id} className="project-item">
        <h3>{extractCleanTitle(video.embedCode)}</h3>
        <div className="btn-product">
          <button id="delete" className="btn-delete" onClick={() => handleTiktokDelete(video.id)}>
            <RiDeleteBin6Fill />
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
        </div>       
      </div>
      {isFormOpen && (
  <div className='overlay' onClick={toggleForm}>
    <div className="admin-form-popup" onClick={(e) => e.stopPropagation()}>
      <button className="close-btn" onClick={toggleForm}>&times;</button>
      <form onSubmit={handleSubmit} className="admin-form">
        <label>
          Tên dự án:
          <input type="text" name="name" value={form.name} onChange={handleInputChange} required />
        </label>
        <label>
          ID:
          <input type="text" name="id" value={form.id} onChange={handleInputChange} required />
        </label>
        <label>
          Năm:
          <input type="text" name="year" value={form.year} onChange={handleInputChange} required />
        </label>
        <label>
          Địa chỉ:
          <input type="text" name="add" value={form.add} onChange={handleInputChange} required />
        </label>
        <label>
          Mô tả:
          <textarea 
            name="deps" 
            value={form.deps} 
            onChange={handleInputChange} 
            required  
            style={{ height: '150px' }}
          />
        </label>
        <label>
          Diện tích:
          <input type="text" name="size" value={form.size} onChange={handleInputChange} required />
        </label>
        <label>
          URL ảnh chính:
          <input type="text" name="image" value={form.image} onChange={handleInputChange} required />
        </label>
        <label>
          URLS thêm ảnh:
          {form.images.map((image, index) => (
            <div key={index} className="image-input-wrapper">
              <input
                type="text"
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                placeholder={`Image URL ${index + 1}`}
                required
              />
              {index === form.images.length - 1 && (
                <button type="button" onClick={addImageField} className="add-image-button btnadd">+</button>
              )}
              <button type="button" onClick={() => removeImageField(index)} className="remove-image-button">-</button>
            </div>
          ))}
        </label>
        <button type="submit">{editingProjectId ? 'Cập nhật' : 'Thêm'}</button>
      </form>
    </div>
  </div>
)}
    </div>
    </div>
    </div>
    
  );
};

export default Admin;
