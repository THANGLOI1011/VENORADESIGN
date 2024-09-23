import React, { useEffect, useState } from 'react';
import { getDatabase, ref, set, get, remove, update } from 'firebase/database';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { Navigate } from 'react-router-dom';
import './Admin.css';

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
  const [userName, setUserName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [projects, setProjects] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);

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
          console.error('Error checking admin status: ', error);
          setIsAdmin(false);
        });
      } else {
        setIsAuthenticated(false);
      }
      setAuthChecked(true);
    });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAdmin) {
      alert('You do not have permission to add or modify data.');
      return;
    }

    const db = getDatabase();
    const projectData = {
      name: form.name,
      id: form.id,
      year: form.year,
      add: form.add,
      deps: form.deps,
      image: form.image,
      size: form.size,
      images: form.images.filter(image => image)
    };

    if (editingProjectId) {
      update(ref(db, `products/${editingProjectId}`), projectData)
        .then(() => {
          alert('Project updated successfully!');
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
          window.scrollTo(0, 0); // Scroll to top
        })
        .catch((error) => {
          console.error('Error updating project:', error);
          alert('Failed to update project. Please try again.');
        });
    } else {
      set(ref(db, `products/${form.id}`), projectData)
        .then(() => {
          alert('Project added successfully!');
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
          window.scrollTo(0, 0); // Scroll to top
        })
        .catch((error) => {
          console.error('Error saving data to database:', error);
          alert('Failed to add project. Please try again.');
        });
    }
  };

  const handleEdit = (project) => {
    setForm(project);
    setEditingProjectId(project.id);
    window.scrollTo(0, 0); // Scroll to top
  };

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
        setProjects(projects.filter(project => project.id !== id)); // Update local state
      })
      .catch((error) => {
        console.error('Error deleting project:', error);
        alert('Failed to delete project. Please try again.');
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert('Successfully logged out.');
        window.location.href = '/login'; // Redirect to login page
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
        alert('Failed to log out. Please try again.');
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
    <div className="admin-container">
      <h1 className='flexCenter' >Quản Trị Viên</h1>
      {userName && <p className='flexCenter'>Xin Chào, {userName}!</p>}
      <div className="btn-logout">
      <button onClick={handleLogout} className="logout-button">Đăng Xuất</button>
      </div>
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
          <input type="text" name="deps" value={form.deps} onChange={handleInputChange} required />
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
      <div className="admin-projects">
        <h2>Tất cả dự án (Tổng: {projects.length})</h2> {/* Display total number of projects */}
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              <img src={project.image} alt={project.name} />
              <div>
                <h3>{project.name}</h3>
                <p>ID: {project.id}</p>
                <p>Năm: {project.year}</p>
                <p>Đại chỉ: {project.add}</p>
                <p>Mô tả: {project.deps}</p>
                <p>Kích thước: {project.size}</p>
                <button id='edit' onClick={() => handleEdit(project)}>Chỉnh sửa</button>
                <button id='delete' onClick={() => handleDelete(project.id)}>Xóa</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
