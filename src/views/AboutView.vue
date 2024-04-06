<template>
  <div>
    <NavbarOrg/>
  <div class="about">
    <div class="section">
      <h2 class="section-title">Üyelik İşlemleri</h2>
      <p class="section-content">Kullanıcılar, siteye erişmek ve kullanmak için öncelikle üye olmalıdır. Üyelik işlemleri, Firebase Authentication (Auth) aracılığıyla gerçekleştirilir ve kullanıcıların giriş yapabilmeleri için e-posta doğrulaması gerekmektedir.</p>
    </div>
    
    <div class="section">
      <h2 class="section-title">Proje Amaçları</h2>
      <p class="section-content">Bu proje tamamen geliştirme ve deneme amaçlı olup, herhangi bir maddi beklenti içermemektedir. Amacı, Vue.js ve Firebase gibi teknolojileri kullanarak interaktif bir mesajlaşma platformu oluşturma sürecinde deneyim kazanmaktır.</p>
    </div>
    <div class="section">
      <h2 class="section-title">Geliştirici Bilgisi</h2>
      <p class="section-content">Bu hafif mesajlaşma sitesi, Vue.js kullanılarak geliştirilmiş olup, altyapı olarak Firebase'i temel almaktadır. Projenin geliştiricisi A. Faruk Namal'dır ve tüm hakları kendisine aittir.</p>
    </div>
    <div class="github-link">
      <a href="https://github.com/afnamal" target="_blank">
        <img src="../assets/gitlogo.jpg" alt="Github Logo" class="github-logo">
        <span class="github-text">Github/afnamal</span>
      </a>
    </div>
  </div>
</div>
</template>

<script>
import NavbarOrg from '../components/NavbarOrg.vue'
export default {
  components: {NavbarOrg}
}
</script>

<style>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.section-content {
  font-size: 18px;
  line-height: 1.5;
}

.github-link {
  text-align: center;
  margin-top: 40px;
}

.github-logo {
  width: 50px;
  height: 50px;
}

.github-text {
  display: block;
  margin-top: 10px;
}
</style>
