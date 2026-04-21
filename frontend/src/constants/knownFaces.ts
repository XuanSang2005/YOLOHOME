/**
 * Danh sách khuôn mặt được phép vào.
 * Key   = tên hiển thị
 * Value = đường dẫn ảnh trong thư mục public/known_faces/
 *
 * Thêm người mới: chép ảnh vào public/known_faces/ rồi thêm dòng ở đây.
 */
export const KNOWN_FACES: Record<string, string> = {
  quynh:   '/known_faces/quynh.jpg',
  quocanh: '/known_faces/quocanh.jpg',
}
