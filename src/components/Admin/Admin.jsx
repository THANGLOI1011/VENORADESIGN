import React, { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  set,
  get,
  remove,
  update,
  push,
} from "firebase/database";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Navigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import "./Admin.css";
import { FaWindowClose } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
const Admin = () => {
  const [form, setForm] = useState({
    name: "",
    id: "",
    year: "",
    add: "",
    deps: "",
    image: "",
    size: "",
    images: [""],
    category: "congtrinhthucte",
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [projects, setProjects] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [isAdminRightVisible, setIsAdminRightVisible] = useState(false);
  const [isHeroTableVisible, setIsHeroTableVisible] = useState(false);
  // video tiktok
  const [tiktokForm, setTiktokForm] = useState({
    embedCode: "",
  });
  const [tiktokVideos, setTiktokVideos] = useState([]);
  const [isTiktokFormOpen, setIsTiktokFormOpen] = useState(false); // Quản lý trạng thái mở form TikTok
  const [isTiktokTableVisible, setIsTiktokTableVisible] = useState(false); // Quản lý trạng thái hiển thị bảng TikTok
  const [heroImages, setHeroImages] = useState([]);
  const [editingHeroIdx, setEditingHeroIdx] = useState(null);
  const [editingHeroValue, setEditingHeroValue] = useState("");
  const [isHeroFormOpen, setIsHeroFormOpen] = useState(false);
  const [isAddingHeroImage, setIsAddingHeroImage] = useState(false);

  const toggleTiktokForm = () => {
    setIsTiktokFormOpen(!isTiktokFormOpen); // Đóng/mở form TikTok
    if (!isTiktokFormOpen) {
      setTiktokForm({ embedCode: "" }); // Reset form khi mở
    }
  };
  useEffect(() => {
    // Lấy danh sách video TikTok từ Firebase
    const fetchTiktokVideos = async () => {
      const db = getDatabase();
      const tiktokRef = ref(db, "tiktokVideos");
      const snapshot = await get(tiktokRef);

      if (snapshot.exists()) {
        setTiktokVideos(
          Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data }))
        );
      }
    };

    fetchTiktokVideos();
  }, []);
  // Thêm hàm fetchHeroImages ra ngoài useEffect để có thể gọi lại
  const fetchHeroImages = async () => {
    const db = getDatabase();
    const heroRef = ref(db, "heroImages");
    const snapshot = await get(heroRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      // Nếu là object (Firebase lưu mảng dạng object khi có key bị xóa), chuyển về mảng
      if (Array.isArray(data)) {
        setHeroImages(data);
      } else if (typeof data === "object" && data !== null) {
        setHeroImages(Object.values(data));
      } else {
        setHeroImages([]);
      }
    } else {
      setHeroImages([]);
    }
  };

  useEffect(() => {
    fetchHeroImages();
  }, []);
  const extractCleanTitle = (embedCode) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = embedCode;

    // Tìm thẻ <section> trong blockquote
    const sectionElement = tempDiv.querySelector("blockquote section");
    if (sectionElement) {
      const fullText = sectionElement.textContent;
      const cleanedText = fullText
        .replace(/@\S+/g, "")
        .replace(/♬.*/g, "")
        .replace(/#\S+/g, "")
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
      alert("Vui lòng nhập thẻ blockquote của TikTok.");
      return;
    }

    const db = getDatabase();
    const tiktokRef = ref(db, "tiktokVideos");
    const newVideoRef = push(tiktokRef);

    const videoData = {
      id: newVideoRef.key,
      embedCode: tiktokForm.embedCode,
    };

    try {
      await set(newVideoRef, videoData);
      alert("Video TikTok đã được thêm thành công!");
      setTiktokVideos([...tiktokVideos, videoData]);
      setTiktokForm({ embedCode: "" });
      setIsTiktokFormOpen(false);
    } catch (error) {
      console.error("Lỗi khi thêm video TikTok:", error);
      alert("Không thể thêm video TikTok. Vui lòng thử lại.");
    }
  };
  const handleHeroImageChange = (idx, value) => {
    const newImages = [...heroImages];
    newImages[idx] = value;
    setHeroImages(newImages);
    saveHeroImagesToFirebase(newImages); // Thêm dòng này để lưu luôn vào database
  };

  const handleAddHeroImage = () => {
    setHeroImages([...heroImages, ""]);
  };

  const handleRemoveHeroImage = (idx) => {
    const newImages = heroImages.filter((_, i) => i !== idx);
    setHeroImages(newImages);
    saveHeroImagesToFirebase(newImages);
  };

  const saveHeroImagesToFirebase = async (images) => {
    const db = getDatabase();
    const heroRef = ref(db, "heroImages");
    await set(
      heroRef,
      images.filter((img) => img.trim() !== "")
    );
    fetchHeroImages(); // Đồng bộ lại state sau khi lưu
  };

  const handleSaveHeroImages = async () => {
    const db = getDatabase();
    const heroRef = ref(db, "heroImages");
    try {
      await set(
        heroRef,
        heroImages.filter((img) => img.trim() !== "")
      );
      alert("Cập nhật ảnh hero thành công!");
    } catch (error) {
      alert("Lỗi khi cập nhật ảnh hero!");
    }
  };
  const handleTiktokDelete = async (id) => {
    const db = getDatabase();
    const videoRef = ref(db, `tiktokVideos/${id}`);

    try {
      await remove(videoRef);
      alert("Video TikTok đã được xóa thành công!");
      setTiktokVideos(tiktokVideos.filter((video) => video.id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa video TikTok:", error);
      alert("Không thể xóa video TikTok. Vui lòng thử lại.");
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
        get(adminRef)
          .then((snapshot) => {
            if (snapshot.exists() && snapshot.val() === true) {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
          })
          .catch((error) => {
            console.error("Lỗi admin hoạt động ", error);
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
      const projectsRef = ref(db, "products");
      get(projectsRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const projectsData = snapshot.val();
            setProjects(Object.values(projectsData));
          }
        })
        .catch((error) => {
          console.error("Error fetching projects:", error);
        });
    };

    fetchProjects();

    return () => unsubscribe();
  }, []);

  // Cập nhật trường dữ liệu
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setForm({
        ...form,
        name: value,
        id: generateIdFromName(value),
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleImageChange = (index, value) => {
    const newImages = [...form.images];
    newImages[index] = value;
    setForm({ ...form, images: newImages });
  };

  const addImageField = () => {
    setForm({ ...form, images: [...form.images, ""] });
  };

  const removeImageField = (index) => {
    const newImages = form.images.filter((_, i) => i !== index);
    setForm({ ...form, images: newImages });
  };
  const generateIdFromName = (name) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  };
  //
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
    if (!isFormOpen) {
      // Reset form khi mở
      setForm({
        name: "",
        id: "",
        year: "",
        add: "",
        deps: "",
        image: "",
        size: "",
        images: [""],
        category: "congtrinhthucte",
      });
      setEditingProjectId(null);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra tất cả các trường
    const { name, id, year, add, deps, image, size, images, category } = form;
    const filteredImages = images.filter((img) => img.trim() !== "");
    if (
      !name ||
      !id ||
      !year ||
      !add ||
      !deps ||
      !image ||
      !size ||
      filteredImages.length === 0 ||
      !category
    ) {
      alert("Vui lòng điền đầy đủ thông tin vào tất cả các trường.");
      return;
    }

    if (!isAdmin) {
      alert("Bạn không có quyền thêm hoặc chỉnh sửa dữ liệu.");
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
      images: filteredImages,
      category,
    };

    if (editingProjectId) {
      // Cập nhật dự án
      update(ref(db, `products/${editingProjectId}`), projectData)
        .then(() => {
          alert("Dự án đã được cập nhật thành công!");
          setEditingProjectId(null);
          setForm({
            name: "",
            id: "",
            year: "",
            add: "",
            deps: "",
            image: "",
            size: "",
            images: [""],
            category: "congtrinhthucte",
          });
          setProjects(
            projects.map((proj) =>
              proj.id === editingProjectId ? projectData : proj
            )
          );
          window.location.reload();
        })
        .catch((error) => {
          console.error("Lỗi khi cập nhật dự án:", error);
          alert("Không thể cập nhật dự án. Vui lòng thử lại.");
        });
    } else {
      // Thêm mới dự án
      set(ref(db, `products/${form.id}`), projectData)
        .then(() => {
          alert("Dự án đã được thêm thành công!");
          setForm({
            name: "",
            id: "",
            year: "",
            add: "",
            deps: "",
            image: "",
            size: "",
            images: [""],
            category: "congtrinhthucte",
          });
          setProjects([...projects, projectData]);
          window.location.reload();
        })
        .catch((error) => {
          console.error("Lỗi khi lưu dữ liệu vào cơ sở dữ liệu:", error);
          alert("Không thể thêm dự án. Vui lòng thử lại.");
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
      alert("You do not have permission to delete data.");
      return;
    }

    const db = getDatabase();
    const projectRef = ref(db, `products/${id}`);
    remove(projectRef)
      .then(() => {
        alert("Project deleted successfully!");
        // Cập nhật danh sách dự án sau khi xóa
        setProjects(projects.filter((project) => project.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting project:", error);
        alert("Failed to delete project. Please try again.");
      });
  };
  const toggleAdminRight = () => {
    setIsAdminRightVisible(!isAdminRightVisible);
    if (!isAdminRightVisible) {
      setTimeout(() => {
        document
          .getElementById("admin-right")
          .scrollIntoView({ behavior: "smooth" });
      }, 200); // Delay nhỏ để UI cập nhật trước khi scroll
    }
  };
  // Đăng xuất
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert("Thành công.");
        window.location.href = "/login"; // Chuyển hướng về trang đăng nhập
      })
      .catch((error) => {
        console.error("Lỗi ", error);
        alert("Thất bại,vui lòng thử lại.");
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
    <div className="box-container">
      <div className="paddings innerWidth a-container ">
        <div className="admin-container ">
          <h1 className="flexCenter ">Venora Admin</h1>
          <div className="btn-logout">
            {userName && <p className="flexCenter">Xin Chào, {userName}!</p>}
            <button onClick={handleLogout} className="logout-button">
              <FiLogOut />
            </button>
          </div>
          <div className="admin-projects">
            <div className="admin-left">
              <span>
                Dự Án
                <br />
                <div className="text-small">Tổng dự án có trên website</div>
                <div className="text-all-project">{projects.length}</div>
                <p onClick={toggleAdminRight} id="detail">
                  {isAdminRightVisible ? "Ẩn chi tiết" : "Xem chi tiết"}
                </p>
              </span>
              <span>
                Video
                <br />
                <div className="text-small">Tổng video có trên website</div>
                <div className="text-all-project">{tiktokVideos.length}</div>
                <p
                  onClick={() => {
                    setIsTiktokTableVisible(!isTiktokTableVisible);
                    if (!isTiktokTableVisible) {
                      setTimeout(() => {
                        document
                          .getElementById("admin-right-tiktok")
                          .scrollIntoView({ behavior: "smooth" });
                      }, 200); // Delay nhỏ để đảm bảo UI cập nhật trước khi cuộn
                    }
                  }}
                  id="detail"
                >
                  {isTiktokTableVisible ? "Ẩn chi tiết" : "Xem chi tiết"}
                </p>
              </span>
              <span>
                Hình Ảnh
                <br />
                <div className="text-small">
                  Tổng hình ảnh có trên website
                </div>
                <div className="text-all-project">{heroImages.length}</div>{" "}
                <p
                  onClick={() => {
                    setIsHeroTableVisible(!isHeroTableVisible);
                    if (!isHeroTableVisible) {
                      setTimeout(() => {
                        document
                          .getElementById("admin-right-hero")
                          .scrollIntoView({ behavior: "smooth" });
                      }, 200);
                    }
                  }}
                  id="detail"
                >
                  {isHeroTableVisible ? "Ẩn chi tiết" : "Xem chi tiết"}
                </p>
              </span>
            </div>
            <div className="admin-right-container">
              {/* 1 */}
              <div
                id="admin-right"
                className={`admin-rightl ${
                  isAdminRightVisible ? "" : "hidden"
                }`}
              >
                <div className="admin-right">
                  <div className="admin-right-title">
                    <h2>
                      Dự Án{" "}
                      <div className="text-small">
                        Dự án đang hoạt động
                      </div>
                    </h2>
                    <h3
                      onClick={toggleForm}
                      id="btn-create"
                      className="btn-toggle-form"
                    >
                      <div className="icon-plus">
                        {isFormOpen ? <FaWindowClose /> : <FaPlus />}
                      </div>
                    </h3>
                  </div>
                  {[...projects].reverse().map((project) => (
                    <div key={project.id} className="project-item">
                      <h3>{project.name}</h3>

                      <div className="btn-product">
                        <button
                          id="edit"
                          onClick={() => handleEdit(project)}
                          className="btn-edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          id="delete"
                          onClick={() => handleDelete(project.id)}
                          className="btn-delete"
                        >
                          <RiDeleteBin6Fill />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* 2 */}
              <div
                id="admin-right-tiktok"
                className={`admin-rightl ${
                  isTiktokTableVisible ? "" : "hidden"
                }`}
              >
                <div className="admin-right">
                  <div className="admin-right-title">
                    <h2>
                      Video {" "}
                      <div className="text-small">
                        Video đang hoạt động
                      </div>
                    </h2>
                    <h3
                      onClick={() => setIsTiktokFormOpen(!isTiktokFormOpen)}
                      id="btn-create"
                      className="btn-toggle-form"
                    >
                      <div className="icon-plus">
                        {isTiktokFormOpen ? <FaWindowClose /> : <FaPlus />}
                      </div>
                    </h3>
                  </div>
                  {[...tiktokVideos].reverse().map((video) => (
                    <div key={video.id} className="project-item">
                      <h3>{extractCleanTitle(video.embedCode)}</h3>
                      <div className="btn-product">
                        <button
                          id="delete"
                          className="btn-delete"
                          onClick={() => handleTiktokDelete(video.id)}
                        >
                          <RiDeleteBin6Fill />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* 3 */}
              <div
                id="admin-right-hero"
                className={`admin-rightl ${isHeroTableVisible ? "" : "hidden"}`}
              >
                <div className="admin-right">
                  <div className="admin-right-title">
                    <h2>
                      Hình Ảnh{" "}
                      <div className="text-small">Hình ảnh đang hoạt động</div>
                    </h2>
                    <h3
                      onClick={() => {
                        setIsHeroFormOpen(!isHeroFormOpen);
                        setIsAddingHeroImage(true);
                        setEditingHeroIdx(null);
                        setEditingHeroValue("");
                      }}
                      id="btn-create"
                      className="btn-toggle-form"
                    >
                      <div className="icon-plus">
                        {isFormOpen ? <FaWindowClose /> : <FaPlus />}
                      </div>
                    </h3>
                  </div>
                  {Array.isArray(heroImages) &&
                    heroImages.map((img, idx) => (
                      <div key={idx} className="project-item">
                        <img
                          src={img}
                          alt={`Hero ${idx + 1}`}
                          
                        />
                        <div className="btn-product">
                          <button
                            className="btn-edit"
                            onClick={() => {
                              setIsHeroFormOpen(true);
                              setIsAddingHeroImage(false);
                              setEditingHeroIdx(idx);
                              setEditingHeroValue(img);
                            }}
                            title="Chỉnh sửa"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => handleRemoveHeroImage(idx)}
                            title="Xóa"
                          >
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
            <div className="overlay" onClick={toggleForm}>
              <div className="admin-form-popup" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={toggleForm}>
                  &times;
                </button>
                <form onSubmit={handleSubmit} className="admin-form">
                  <label>
                    <h4>Tên dự án</h4>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      placeholder="Nhập tên dự án"
                      required
                    />
                  </label>
                  {/* Bỏ input id, id vẫn tự sinh ra từ tên dự án */}
                  <label>
                    <h4>Năm</h4>
                    <input
                      type="text"
                      name="year"
                      value={form.year}
                      onChange={handleInputChange}
                      placeholder="Nhập năm"
                      required
                    />
                  </label>
                  <label>
                    <h4>Địa chỉ</h4>
                    <input
                      type="text"
                      name="add"
                      value={form.add}
                      onChange={handleInputChange}
                      placeholder="Nhập địa chỉ dự án"
                      required
                    />
                  </label>
                  <label>
                    <h4>Mô tả</h4>
                    <textarea
                      name="deps"
                      value={form.deps}
                      onChange={handleInputChange}
                      placeholder="Nhập mô tả dự án"
                      className="textarea-deps"
                      required
                      style={{ height: "150px", borderColor: "#ddd",borderRadius:5,padding:24 }}
                    />
                  </label>
                  <label>
                    <h4>Diện tích</h4>
                    <input
                      type="text"
                      name="size"
                      value={form.size}
                      onChange={handleInputChange}
                      placeholder="Nhập diện tích dự án"
                      required
                    />
                  </label>
                  <label>
  <h4>Loại dự án</h4>
  <div style={{ position: "relative", width: "100%" }}>
    <select
      name="category"
      value={form.category}
      onChange={handleInputChange}
      required
      className="category-select custom-arrow"
      style={{ width: "100%", paddingRight: 48 }}
    >
      <option value="nhapho">Nhà phố</option>
      <option value="congtrinhthucte">Công trình thực tế</option>
      <option value="nhavuon">Nhà vườn</option>
    </select>
    <FaChevronDown
      style={{
        position: "absolute",
        right: 24,
        top: "50%",
        transform: "translateY(-50%)",
        pointerEvents: "none",
        color: "#333",
        fontSize: 14,
      }}
    />
  </div>
</label>
                  <label>
                    <h4>Ảnh dự án</h4>
                    <input
                      type="text"
                      name="image"
                      value={form.image}
                      onChange={handleInputChange}
                      placeholder="Nhập link ảnh đại diện"
                      required
                    />
                  </label>
                  <label>
                    <h4>Thêm ảnh phụ</h4>
                    <div style={{ display: "flex", gap: 8 }}>
                      <input
                        type="text"
                        value={form.newImageUrl || ""}
                        onChange={e => setForm({ ...form, newImageUrl: e.target.value })}
                        placeholder="Nhập link ảnh phụ"
                      />
                      <button
                        type="button"
                        className="add-image-button btnadd"
                        onClick={() => {
                          if (form.newImageUrl && form.newImageUrl.trim()) {
                            setForm({
                              ...form,
                              images: [...form.images, form.newImageUrl],
                              newImageUrl: ""
                            });
                          }
                        }}
                      >
                        <FaPlus />
                        Thêm
                      </button>
                    </div>
                    <div className="image-thumbnails" style={{ marginTop: 12, display: "flex", gap: 28, flexWrap: "wrap",justifyContent:"center" }}>
                      {form.images.filter(img => img.trim()).map((img, idx) => (
                        <div key={idx} style={{ position: "relative", display: "inline-block" }}>
                          <img src={img} alt={`Ảnh phụ ${idx + 1}`} style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 6, border: "1px solid #eee" }} />
                          <button
                            type="button"
                            onClick={() => {
                              setForm({
                                ...form,
                                images: form.images.filter((_, i) => i !== idx)
                              });
                            }}
                            style={{ position: "absolute", top: -8, right: -8, background: "#fff", border: "1px solid #ccc", borderRadius: "50%", width: 22, height: 22, cursor: "pointer", color: "#d00", fontWeight: "bold" }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </label>
                  <button className="btn-add" type="submit">
                    {editingProjectId ? "CẬP NHẬT" : "THÊM DỰ ÁN"}
                  </button>
                </form>
              </div>
            </div>
          )}
          {isTiktokFormOpen && (
            <div className="overlay" onClick={() => setIsTiktokFormOpen(false)}>
              <div
                className="admin-form-popup"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="close-btn"
                  onClick={() => setIsTiktokFormOpen(false)}
                >
                  &times;
                </button>
                <form onSubmit={handleTiktokSubmit} className="admin-form">
                  <label>
                    <h4>Link TikTok</h4>
                    <textarea
                      name="embedCode"
                      value={tiktokForm.embedCode}
                      onChange={handleTiktokInputChange}
                      required
                      style={{ height: "120px", borderColor: "#ddd",borderRadius:5,padding:24,outline:"none",color:"#0d0d0d" }}
                    />
                  </label>
                  <button type="submit">THÊM VIDEO</button>
                </form>
              </div>
            </div>
          )}
          {(editingHeroIdx !== null || isAddingHeroImage) && (
            <div
              className="overlay"
              onClick={() => {
                setEditingHeroIdx(null);
                setIsAddingHeroImage(false);
              }}
            >
              <div
                className="admin-form-popup"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="close-btn"
                  onClick={() => {
                    setEditingHeroIdx(null);
                    setIsAddingHeroImage(false);
                  }}
                >
                  &times;
                </button>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (isAddingHeroImage) {
                      const newImages = [...heroImages, editingHeroValue];
                      saveHeroImagesToFirebase(newImages);
                      setIsAddingHeroImage(false);
                      setEditingHeroValue("");
                    } else {
                      const newImages = [...heroImages];
                      newImages[editingHeroIdx] = editingHeroValue;
                      saveHeroImagesToFirebase(newImages);
                      setEditingHeroIdx(null);
                      setEditingHeroValue("");
                    }
                    setIsHeroFormOpen(false); // Đóng form sau khi submit
                  }}
                  className="admin-form"
                >
                  <label>
                    <h4>Đường dẫn ảnh Hero</h4>
                    <input
                      type="text"
                      value={editingHeroValue}
                      onChange={(e) => setEditingHeroValue(e.target.value)}
                      required
                    />
                  </label>
                  <div style={{ margin: "10px 0" }}>
                    <img
                      src={editingHeroValue}
                      alt="Ảnh Hero"
                      style={{ width: 120 }}
                    />
                  </div>
                  <button type="submit" className="btn-edit">
                    {isAddingHeroImage ? "THÊM" : "LƯU"}
                  </button>
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
