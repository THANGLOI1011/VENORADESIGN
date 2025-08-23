import React, { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { Link } from "react-router-dom";
import { CgPlayButtonO } from "react-icons/cg";
import './TikTokProduct.css';

const TikTokProduct = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const dbRef = ref(getDatabase(), "tiktokVideos");
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          const videoList = await Promise.all(
            Object.values(snapshot.val()).map(async (video) => {
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

          setVideos(videoList.filter(Boolean));
        }
      } catch (error) {
        console.error("🔥 Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div data-aos="fade-up" className="bg-product">
        <div className="img-tiktok">
          <img src="/image-tiktok3.jpg" alt="" />
        </div>
      <div className="tiktok tiktok-product  innerWidth paddings">
      <div className="tiktok-items">
        <h2>TẤT CẢ VIDEO</h2>
        <span>Bộ sưu tập mọi video viral, ghi lại những khoảnh khắc, câu chuyện và cảm xúc lan <br />tỏa mạnh mẽ</span>
        <div className="video-container video-container-product video-container-tiktok">
          {[...videos].reverse().map((video, index) => (
            <Link to={`/tiktok/${video.videoId}`} key={index} className="video-item">
              <div className="video-thumbnail-container">
                <img
                  src={video.thumbnailUrl || "https://via.placeholder.com/300"}
                  alt="TikTok Thumbnail"
                  className="video-thumbnail"
                />
                <div className="play-button"><CgPlayButtonO /></div>
                <div className="related-video-info">

                <p className="video-title">{video.title}</p>
                <p className="video-hashtags">{video.hashtags}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default TikTokProduct;