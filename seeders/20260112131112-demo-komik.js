'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Kita anggap User ID 1 adalah 'NarutoUzumaki' (User pertamamu)
    const userId = 1; 

    const dataKomik = [
      { judul: "One Piece", penulis: "Eiichiro Oda", deskripsi: "Petualangan Luffy mencari harta karun.", userId },
      { judul: "Naruto", penulis: "Masashi Kishimoto", deskripsi: "Ninja oren pengen jadi Hokage.", userId },
      { judul: "Bleach", penulis: "Tite Kubo", deskripsi: "Ichigo jadi dewa kematian dadakan.", userId },
      { judul: "Dragon Ball Z", penulis: "Akira Toriyama", deskripsi: "Goku nyari bola naga.", userId },
      { judul: "Attack on Titan", penulis: "Hajime Isayama", deskripsi: "Manusia lawan raksasa pemakan orang.", userId },
      { judul: "Demon Slayer", penulis: "Koyoharu Gotouge", deskripsi: "Tanjiro membasmi iblis demi adiknya.", userId },
      { judul: "Jujutsu Kaisen", penulis: "Gege Akutami", deskripsi: "Sekolah penyihir pembasmi kutukan.", userId },
      { judul: "Spy x Family", penulis: "Tatsuya Endo", deskripsi: "Keluarga palsu: Mata-mata, Pembunuh, Telepath.", userId },
      { judul: "Chainsaw Man", penulis: "Tatsuki Fujimoto", deskripsi: "Cowok jadi gergaji mesin.", userId },
      { judul: "Tokyo Revengers", penulis: "Ken Wakui", deskripsi: "Kembali ke masa lalu buat nyelamatin pacar.", userId },
      { judul: "My Hero Academia", penulis: "Kohei Horikoshi", deskripsi: "Sekolah superhero All Might.", userId },
      { judul: "Hunter x Hunter", penulis: "Yoshihiro Togashi", deskripsi: "Gon nyari bapaknya yang hunter.", userId },
      { judul: "Death Note", penulis: "Tsugumi Ohba", deskripsi: "Buku catatan pencabut nyawa.", userId },
      { judul: "Fullmetal Alchemist", penulis: "Hiromu Arakawa", deskripsi: "Dua bersaudara ahli kimia.", userId },
      { judul: "One Punch Man", penulis: "ONE & Murata", deskripsi: "Pahlawan botak sekali pukul mati.", userId },
      { judul: "Black Clover", penulis: "Yuki Tabata", deskripsi: "Asta gak punya sihir pengen jadi Kaisar Sihir.", userId },
      { judul: "Fairy Tail", penulis: "Hiro Mashima", deskripsi: "Guild penyihir rusuh.", userId },
      { judul: "Blue Lock", penulis: "Muneyuki Kaneshiro", deskripsi: "Sepak bola egois battle royale.", userId },
      { judul: "Haikyuu!!", penulis: "Haruichi Furudate", deskripsi: "Voli SMA Karasuno.", userId },
      { judul: "Sword Art Online", penulis: "Reki Kawahara", deskripsi: "Terjebak di dalam game VRMMO.", userId },
      { judul: "Tokyo Ghoul", penulis: "Sui Ishida", deskripsi: "Kaneki jadi setengah hantu pemakan manusia.", userId },
      { judul: "Gintama", penulis: "Hideaki Sorachi", deskripsi: "Samurai lawan alien kocak.", userId },
      { judul: "Dr. Stone", penulis: "Riichiro Inagaki", deskripsi: "Membangun peradaban dari batu.", userId },
      { judul: "Fire Force", penulis: "Atsushi Ohkubo", deskripsi: "Pemadam kebakaran lawan api setan.", userId },
      { judul: "Seven Deadly Sins", penulis: "Nakaba Suzuki", deskripsi: "Ksatria pendosa besar.", userId },
      { judul: "Boruto", penulis: "Kishimoto & Ikemoto", deskripsi: "Anaknya Naruto, lebih modern.", userId },
      { judul: "Mob Psycho 100", penulis: "ONE", deskripsi: "Anak kalem tapi psychic over power.", userId },
      { judul: "Code Geass", penulis: "Sunrise", deskripsi: "Lelouch pengen hancurin kerajaan.", userId },
      { judul: "Steins;Gate", penulis: "5pb", deskripsi: "Microwave bisa kirim pesan ke masa lalu.", userId },
      { judul: "Re:Zero", penulis: "Tappei Nagatsuki", deskripsi: "Mati hidup lagi di dunia lain.", userId },
      { judul: "Konosuba", penulis: "Natsume Akatsuki", deskripsi: "Dunia lain tapi konyol parah.", userId },
      { judul: "Overlord", penulis: "Kugane Maruyama", deskripsi: "Terjebak jadi raja tengkorak di game.", userId },
      { judul: "That Time I Got Reincarnated as a Slime", penulis: "Fuse", deskripsi: "Reinkarnasi jadi slime sakti.", userId },
      { judul: "Mushoku Tensei", penulis: "Rifujin na Magonote", deskripsi: "Bayi penyihir jenius.", userId },
      { judul: "Vinland Saga", penulis: "Makoto Yukimura", deskripsi: "Viking dan balas dendam.", userId },
      { judul: "Berserk", penulis: "Kentaro Miura", deskripsi: "Guts lawan takdir gelap.", userId },
      { judul: "Vagabond", penulis: "Takehiko Inoue", deskripsi: "Samurai Musashi Miyamoto.", userId },
      { judul: "Monster", penulis: "Naoki Urasawa", deskripsi: "Dokter ngejar pembunuh berantai.", userId },
      { judul: "JoJo Bizarre Adventure", penulis: "Hirohiko Araki", deskripsi: "Pose ganteng dan kekuatan Stand.", userId },
      { judul: "Neon Genesis Evangelion", penulis: "Hideaki Anno", deskripsi: "Robot lawan Angel, depresi.", userId },
      { judul: "Cowboy Bebop", penulis: "Sunrise", deskripsi: "Bounty hunter luar angkasa.", userId },
      { judul: "Samurai Champloo", penulis: "Manglobe", deskripsi: "Hip hop samurai.", userId },
      { judul: "Hajime no Ippo", penulis: "George Morikawa", deskripsi: "Petinju pemula jadi juara.", userId },
      { judul: "Slam Dunk", penulis: "Takehiko Inoue", deskripsi: "Basket SMA Shohoku.", userId },
      { judul: "Kuroko no Basket", penulis: "Tadatoshi Fujimaki", deskripsi: "Basket jurus aneh-aneh.", userId },
      { judul: "Solo Leveling", penulis: "Chugong", deskripsi: "Hunter terlemah jadi shadow monarch.", userId },
      { judul: "Wind Breaker", penulis: "Jo Yongseuk", deskripsi: "Balapan sepeda jalanan.", userId },
      { judul: "Lookism", penulis: "Park Taejoon", deskripsi: "Punya dua badan, satu ganteng satu jelek.", userId },
      { judul: "Tower of God", penulis: "SIU", deskripsi: "Naik menara demi keinginan.", userId },
      { judul: "Noblesse", penulis: "Jeho Son", deskripsi: "Vampir bangsawan bangun tidur.", userId }
    ];

    // Tambahin timestamp biar valid
    const dataWithTime = dataKomik.map(item => ({
      ...item,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('komik', dataWithTime, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Komiks', null, {});
  }
};