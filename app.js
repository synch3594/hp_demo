document.addEventListener('DOMContentLoaded', () => {
  // websiteData は data.js でグローバル定義されています
  if (typeof websiteData === 'undefined') {
    console.error('websiteData is not defined. Please check data.js.');
    return;
  }

  // ==========================================================================
  // 1. Data Binding (データ流し込み)
  // ==========================================================================
  
  // 会社基本情報
  const company = websiteData.company;
  document.title = `${websiteData.hero.title} | ${company.name}`;
  document.getElementById('logo-main-text').textContent = company.logoText;
  document.getElementById('logo-sub-text').textContent = company.name;
  
  const telLinks = ['nav-tel-link', 'cta-tel-link', 'hero-btn-call'];
  telLinks.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.href = `tel:${company.tel.replace(/-/g, '')}`;
    }
  });
  
  document.getElementById('nav-tel-text').textContent = company.tel;
  document.getElementById('cta-tel-text').textContent = company.tel;
  document.getElementById('cta-tel-hours').textContent = company.telHours;
  
  document.getElementById('cta-email-link').href = `mailto:${company.email}`;
  document.getElementById('hero-btn-email').href = `mailto:${company.email}`;

  // ヒーローセクション
  document.getElementById('hero-title').textContent = websiteData.hero.title;
  document.getElementById('hero-subtitle').textContent = websiteData.hero.subtitle;

  // 私たちの強み
  const strengthsContainer = document.getElementById('strengths-container');
  strengthsContainer.innerHTML = websiteData.strengths.map(strength => `
    <div class="strength-card" id="${strength.id}">
      <div class="strength-icon">
        ${getSvgIcon(strength.icon)}
      </div>
      <h3>${strength.title}</h3>
      <p>${strength.description}</p>
    </div>
  `).join('');

  // サービス案内
  const servicesContainer = document.getElementById('services-container');
  servicesContainer.innerHTML = websiteData.services.map((service, index) => `
    <div class="service-card" id="${service.id}">
      <div class="service-num">${String(index + 1).padStart(2, '0')}</div>
      <h3>${service.title}</h3>
      <div class="service-subtitle">${service.subtitle}</div>
      <p class="service-description">${service.description}</p>
      <div class="service-targets">
        ${service.targets.map(target => `<span class="service-tag">${target}</span>`).join('')}
      </div>
      <div class="service-price">${service.price}</div>
    </div>
  `).join('');

  // 施工事例 (Before/After)
  const portfolioContainer = document.getElementById('portfolio-container');
  portfolioContainer.innerHTML = websiteData.portfolio.map(item => `
    <div class="portfolio-item" id="${item.id}">
      <div class="comparison-slider">
        <div class="slider-label label-before">BEFORE</div>
        <img class="comparison-image image-before" src="${item.beforeImg}" alt="清掃前: ${item.title}">
        
        <div class="slider-label label-after">AFTER</div>
        <img class="comparison-image image-after" src="${item.afterImg}" alt="清掃後: ${item.title}">
        
        <div class="slider-handle">
          <div class="slider-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 5 3 10 8 15"></polyline><polyline points="16 5 21 10 16 15"></polyline></svg>
          </div>
        </div>
      </div>
      <div class="portfolio-details">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <div class="portfolio-meta">${item.detail}</div>
      </div>
    </div>
  `).join('');

  // ご利用の流れ
  const flowContainer = document.getElementById('flow-container');
  flowContainer.innerHTML = websiteData.flow.map(step => `
    <div class="flow-step">
      <div class="flow-number">${step.step}</div>
      <h3>${step.title}</h3>
      <p>${step.description}</p>
    </div>
  `).join('');

  // 会社概要
  const profileTable = document.getElementById('profile-table');
  profileTable.innerHTML = websiteData.companyInfo.map(info => `
    <tr>
      <th>${info.label}</th>
      <td>${info.value}</td>
    </tr>
  `).join('');

  // お知らせ
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = websiteData.news.map(item => `
    <article class="news-item" data-id="${item.id}">
      <div class="news-meta">
        <time class="news-date" datetime="${item.date.replace(/\./g, '-')}">${item.date}</time>
        <span class="news-badge ${item.category}">${item.category}</span>
      </div>
      <h3 class="news-title">${item.title}</h3>
    </article>
  `).join('');

  // CTA セクション
  document.getElementById('cta-title').textContent = websiteData.cta.title;
  document.getElementById('cta-subtitle').textContent = websiteData.cta.subtitle;
  document.getElementById('cta-tel-text').textContent = company.tel;
  
  // フッター
  document.getElementById('footer-logo-text').textContent = company.logoText;
  document.getElementById('footer-logo-sub').textContent = company.name;
  document.getElementById('footer-copyright').innerHTML = `&copy; ${new Date().getFullYear()} ${company.name}. All Rights Reserved.`;

  // ==========================================================================
  // 2. SVG Icons Helper
  // ==========================================================================
  function getSvgIcon(iconName) {
    switch (iconName) {
      case 'clock':
        return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`;
      case 'wind':
        return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59-3.41A2 2 0 1 1 14 6H2m15.59 7.41A2 2 0 1 1 19 16H2M16 12H2"></path></svg>`;
      case 'shield':
        return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`;
      default:
        return '';
    }
  }

  // ==========================================================================
  // 3. Header Scroll Effect
  // ==========================================================================
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ==========================================================================
  // 4. Mobile Menu Toggle
  // ==========================================================================
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // スマホトグル時にヘッダー背景を白く保つ
    header.classList.add('scrolled');
  });

  // メニュー内のリンクをクリックしたら閉じる
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navMenu.classList.remove('active');
      }
    });
  });

  // ==========================================================================
  // 5. Scroll Reveal Animation
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target); // 一度フェードインしたら監視をやめる
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================================================
  // 6. Before/After Image Comparison Slider
  // ==========================================================================
  function initSliders() {
    const sliders = document.querySelectorAll('.comparison-slider');
    sliders.forEach(slider => {
      const handle = slider.querySelector('.slider-handle');
      const beforeImage = slider.querySelector('.image-before');
      
      let isDragging = false;
      
      function moveSlider(x) {
        const rect = slider.getBoundingClientRect();
        // スライダーコンテナに対する相対的なX位置の割合 (0%〜100%)
        let position = ((x - rect.left) / rect.width) * 100;
        
        // 境界値チェック
        if (position < 0) position = 0;
        if (position > 100) position = 100;
        
        // つまみの位置とBEFORE画像のクリップ領域を更新
        handle.style.left = `${position}%`;
        beforeImage.style.clipPath = `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`;
      }
      
      // 初期位置を設定 (50%)
      handle.style.left = '50%';
      beforeImage.style.clipPath = 'polygon(0 0, 50% 0, 50% 100%, 0 100%)';
      
      // マウスイベント
      slider.addEventListener('mousedown', (e) => {
        isDragging = true;
        moveSlider(e.clientX);
      });
      
      window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        moveSlider(e.clientX);
      });
      
      window.addEventListener('mouseup', () => {
        isDragging = false;
      });
      
      // タッチイベント (スマホ・タブレット)
      slider.addEventListener('touchstart', (e) => {
        isDragging = true;
        moveSlider(e.touches[0].clientX);
      });
      
      window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        moveSlider(e.touches[0].clientX);
      });
      
      window.addEventListener('touchend', () => {
        isDragging = false;
      });
    });
  }

  // スライダー初期化
  initSliders();

  // ==========================================================================
  // 7. News Modal Logic (お知らせ詳細表示モーダル)
  // ==========================================================================
  const newsModal = document.getElementById('news-modal');
  const newsModalOverlay = document.getElementById('news-modal-overlay');
  const newsModalClose = document.getElementById('news-modal-close');
  
  const modalDate = document.getElementById('news-modal-date');
  const modalBadge = document.getElementById('news-modal-badge');
  const modalTitle = document.getElementById('news-modal-title');
  const modalBody = document.getElementById('news-modal-body');

  function openNewsModal(newsId) {
    const item = websiteData.news.find(n => n.id === newsId);
    if (!item) return;

    modalDate.textContent = item.date;
    modalDate.setAttribute('datetime', item.date.replace(/\./g, '-'));
    
    modalBadge.textContent = item.category;
    modalBadge.className = `news-badge ${item.category}`;
    
    modalTitle.textContent = item.title;
    modalBody.textContent = item.content;

    newsModal.classList.add('active');
    newsModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // 背後のスクロールを防止
  }

  function closeNewsModal() {
    newsModal.classList.remove('active');
    newsModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // スクロール制限を解除
  }

  // お知らせ項目へのクリックイベント設定
  const newsItems = document.querySelectorAll('.news-item');
  newsItems.forEach(item => {
    item.addEventListener('click', () => {
      const newsId = item.getAttribute('data-id');
      openNewsModal(newsId);
    });
  });

  // モーダルを閉じるイベント設定
  newsModalClose.addEventListener('click', closeNewsModal);
  newsModalOverlay.addEventListener('click', closeNewsModal);

  // Escキーで閉じる
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && newsModal.classList.contains('active')) {
      closeNewsModal();
    }
  });
});
