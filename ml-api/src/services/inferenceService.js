const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictClassification(model, image) {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([256, 256])
      .expandDims()
      .toFloat()
      .div(255.0)
      

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    const classes = ['Common Rust', 'Grey Leaf Spot', 'Leaf Blight',  'Healty'];

    const classResult = tf.argMax(prediction, 1).dataSync()[0];
    const label = classes[classResult];

    let explanation, suggestion;

    if (label === 'Common Rust') {
      explanation = "Gambar ini menunjukkan daun jagung dengan gejala yang tampaknya terkait dengan infeksi penyakit. Berdasarkan pola kerusakan daun, kemungkinan besar ini adalah Common Rust (Puccinia sorghi) atau masalah lain seperti infeksi jamur atau kerusakan akibat serangga.";
      suggestion = "Untuk menangani penyakit pada jagung, langkah pertama adalah memotong daun yang terinfeksi untuk mencegah penyebaran penyakit ke bagian lain tanaman. Selanjutnya, aplikasikan fungisida berbahan aktif seperti Mancozeb untuk pencegahan atau Propiconazole dan Azoxystrobin untuk mengatasi infeksi parah, dengan penyemprotan dilakukan saat cuaca cerah agar larutan terserap optimal. Perbaikan kondisi lingkungan juga penting, seperti mengurangi kepadatan tanaman untuk meningkatkan sirkulasi udara dan menghindari penyiraman langsung pada daun, karena kelembapan tinggi dapat memicu infeksi jamur. Selain itu, lakukan rotasi tanaman dengan menanam tanaman selain jagung pada musim berikutnya untuk memutus siklus hidup patogen.";
    }
    
    if (label === 'Grey Leaf Spot') {
      explanation = "Gambar ini menunjukkan gejala bercak abu-abu pada daun jagung, yang dikenal sebagai Corn Grey Spot (Cercospora zeae-maydis). Penyakit ini ditandai dengan bercak kecil berbentuk persegi panjang, berwarna cokelat keabu-abuan, sering kali dengan tepi yang tajam, dan dapat menyebar jika tidak ditangani.";
      suggestion = "Untuk mengatasi Corn Grey Spot, potong daun yang terinfeksi untuk mencegah penyebaran. Gunakan fungisida berbahan aktif seperti Strobilurins atau Triazoles. Pastikan tanaman mendapatkan jarak tanam yang cukup untuk meningkatkan sirkulasi udara, dan hindari kelembapan tinggi dengan menyiram hanya di bagian akar. Lakukan rotasi tanaman dengan tanaman non-host untuk mengurangi risiko infeksi pada musim berikutnya.";
    }
    

    if (label === 'Healty') {
      explanation = "Gambar ini menunjukkan daun jagung yang sehat tanpa tanda-tanda infeksi atau kerusakan. Tanaman tampak tumbuh optimal dengan daun berwarna hijau cerah dan tidak ada bercak atau gejala penyakit.";
      suggestion = "Pertahankan kondisi ini dengan memastikan tanaman mendapatkan cukup air, nutrisi, dan sirkulasi udara yang baik. Lakukan pemantauan rutin untuk mendeteksi gejala penyakit sejak dini. Gunakan praktik pertanian yang baik seperti rotasi tanaman dan pengelolaan hama secara berkala untuk mencegah potensi infeksi.";
    }

    if (label === 'Leaf Blight') {  
      explanation = "Gambar ini menunjukkan gejala busuk daun (Leaf Blight), yang disebabkan oleh jamur Exserohilum turcicum (Northern Corn Leaf Blight) atau Bipolaris maydis (Southern Corn Leaf Blight). Penyakit ini ditandai dengan bercak cokelat berbentuk lonjong memanjang, yang sering menyatu dan menyebabkan kerusakan daun yang luas.";
      suggestion = "Gunakan varietas jagung yang tahan terhadap Leaf Blight sebagai langkah pencegahan. Semprotkan fungisida berbahan aktif seperti Mancozeb, Chlorothalonil, atau Propiconazole saat gejala awal terlihat. Pastikan kebersihan lahan dengan membersihkan sisa tanaman yang terinfeksi setelah panen, dan lakukan rotasi tanaman untuk mencegah keberlanjutan patogen di tanah.";
    }

    return { confidenceScore, label, explanation, suggestion };
  } catch (error) {
    throw new InputError(`Terjadi kesalahan input: ${error.message}`);
  }
}

module.exports = predictClassification;