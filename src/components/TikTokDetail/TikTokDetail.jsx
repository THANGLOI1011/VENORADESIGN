import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getDatabase, ref, get } from "firebase/database";
import './TikTokDetail.css';

const TikTokDetail = () => {
  const { videoId } = useParams(); // Lấy videoId từ URL
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    const fetchRelatedVideos = async () => {
      try {
        const dbRef = ref(getDatabase(), "tiktokVideos");
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          const allVideos = Object.values(snapshot.val());
          const randomVideos = allVideos
            .sort(() => 0.5 - Math.random()) // Trộn ngẫu nhiên danh sách video
            .slice(0, 4); // Lấy 4 video ngẫu nhiên

          const videoList = await Promise.all(
            randomVideos.map(async (video) => {
              const match = video.embedCode.match(/data-video-id="(\d+)"/);
              const userMatch = video.embedCode.match(/@([a-zA-Z0-9._-]+)/);

              if (!match || !userMatch) return null;

              const videoId = match[1];
              const username = userMatch[1];

              const oEmbedUrl = `https://www.tiktok.com/oembed?url=https://www.tiktok.com/@${username}/video/${videoId}`;
              let thumbnailUrl = "", title = "", hashtags = "";

              try {
                const response = await fetch(oEmbedUrl);
                const data = await response.json();
                thumbnailUrl = data.thumbnail_url || "";
                // Tách tiêu đề và hashtag
                title = (data.title || "").replace(/#[^\s#]+/g, "").trim();
                hashtags = (data.title || "").match(/#[^\s#]+/g)?.join(" ") || "";
              } catch (error) {
                console.error("⚠️ Lỗi khi lấy dữ liệu từ oEmbed:", error);
              }

              return { videoId, thumbnailUrl, title, hashtags };
            })
          );

          setRelatedVideos(videoList.filter(Boolean));
        }
      } catch (error) {
        console.error("🔥 Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchRelatedVideos();
  }, []);

  return (
    <div data-aos="fade-up" className="bg-tiktok-detail">
      <div className="tiktok-detail-bg">
        <div className="tiktok-detail-center paddings innerWidth ">
          <div className="tiktok-detail-layout ">
            {/* Video chi tiết */}
            <div className="tiktok-detail">
              <iframe
                src={`https://www.tiktok.com/embed/${videoId}`}
                width="340"
                height="800"
                style={{ border: "none", borderRadius: "16px", background: "#fff" }}
                allow="encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video liên quan */}
            <div className="related-videos ">
              <h1 className="related-videos-title">VIDEO KHÁC</h1>
              <div className="related-video-list">
                {relatedVideos.map((video, index) => (
                  <Link to={`/tiktok/${video.videoId}`} key={index} className="related-video-item">
                    <img
                      src={video.thumbnailUrl || "https://via.placeholder.com/300"}
                      alt="TikTok Thumbnail"
                      className="related-video-thumbnail"
                    />
                    <div className="related-video-info">
                      <h3 className="related-video-title">{video.title}</h3>
                      <p className="related-video-hashtags">{video.hashtags}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TikTokDetail;