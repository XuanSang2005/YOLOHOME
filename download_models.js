/**
 * Script tải model AI của face-api.js về thư mục public/models/
 * Chạy 1 lần: node download_models.js
 */
const https = require('https')
const fs    = require('fs')
const path  = require('path')

const BASE = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights'
const OUT  = path.join(__dirname, 'frontend', 'public', 'models')

const FILES = [
  'ssd_mobilenetv1_model-weights_manifest.json',
  'ssd_mobilenetv1_model-shard1',
  'ssd_mobilenetv1_model-shard2',
  'face_landmark_68_model-weights_manifest.json',
  'face_landmark_68_model-shard1',
  'face_recognition_model-weights_manifest.json',
  'face_recognition_model-shard1',
  'face_recognition_model-shard2',
]

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true })

function download(file) {
  return new Promise((resolve, reject) => {
    const dest = path.join(OUT, file)
    if (fs.existsSync(dest)) {
      console.log(`[SKIP] ${file} (đã có)`)
      return resolve()
    }
    const stream = fs.createWriteStream(dest)
    https.get(`${BASE}/${file}`, res => {
      res.pipe(stream)
      stream.on('finish', () => { stream.close(); console.log(`[OK]   ${file}`); resolve() })
    }).on('error', e => { fs.unlink(dest, () => {}); reject(e) })
  })
}

;(async () => {
  console.log('Đang tải model AI face-api.js...\n')
  for (const f of FILES) await download(f)
  console.log('\nXong! Model đã lưu tại frontend/public/models/')
})()
