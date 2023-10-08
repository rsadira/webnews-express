$(document).ready(function () {
  $("#create-news-form").submit(function (event) {
    event.preventDefault(); // Menghentikan pengiriman formulir secara default

    // Mengambil data dari formulir
    let title = $("#title").val();
    let cover = $("#cover").val();
    let content = $("#content").val();

    // Mengirim data ke API menggunakan AJAX
    $.ajax({
      url: "/api/v1/news", // Ganti dengan URL API sesuai dengan struktur Anda
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        title: title,
        cover: cover,
        content: content,
        isPublic: true,
        author: "Admin",
      }),
      success: function (response) {
        // Tindakan setelah berhasil
        alert("Berita berhasil ditambah.");
        // Redirect ke halaman lain atau lakukan sesuatu yang sesuai kebutuhan Anda
        window.location.href = "/";
      },
      error: function (error) {
        // Tindakan jika terjadi kesalahan
        console.error("Terjadi kesalahan: " + JSON.stringify(error));
        alert("Gagal menyimpan berita.");
      },
    });
  });
});

$("#comment-form").submit(function (event) {
  event.preventDefault();

  const name = $("#name").val();
  const commentText = $("#comment").val();
  const newsId = $("#newsId").val();

  $.ajax({
    url: "/api/v1/comments", // Ganti dengan URL API sesuai dengan struktur Anda
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({ name, comment: commentText, news_id: newsId }),
    success: function (response) {
      alert("Komentar berhasil ditambah.");

      windows.location = "/news/" + newsId;
    },
    error: function (error) {
      console.error("Terjadi Kesalahan: " + JSON.stringify(error));
      alert("Gagal menyimpan komentar.");
    },
  });

  $("#name").val("");
  $("#comment").val("");

  $.ajax({
    url: `/api/v1/comments/${commentId}`,
    type: "DELETE",
    success: function (response) {
      alert("Komentar berhasil dihapus.");
      const newsId = response.newsId;
      // Redirect to the news page associated with the deleted comment
      window.location.href = `/news/${newsId}`;
    },
    error: function (error) {
      console.error("Error:", error);
      alert("Gagal menghapus komentar.");
    },
  });
});

$(document).ready(function () {
  $("#update-news-form").submit(function (event) {
    event.preventDefault();

    let formData = new FormData($(this)[0]);
    let newsId = formData.get("newsId");

    $.ajax({
      url: `/api/v1/news/${newsId}`, // Use the appropriate URL for news update
      type: "PUT",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        alert("Berita berhasil diperbarui.");
        // Redirect to the news detail page or perform other actions as needed
        window.location.href = `/news/${newsId}`;
      },
      error: function (error) {
        console.error("Terjadi kesalahan: " + JSON.stringify(error));
        alert("Gagal memperbarui berita.");
      },
    });
  });
});
