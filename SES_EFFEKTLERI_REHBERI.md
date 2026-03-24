# 🔊 SnakePlanet – Ses Efektleri Rehberi

Ses dosyaları **`assets/sounds/`** klasöründe. Hepsi **MP3** olmalı. Değiştirmek için yeni dosyayı indir, aynı ada koyup üzerine yaz veya `SoundManager.js` içindeki dosya adını güncelle.

---

## Dosya – Ne zaman çalıyor – Arama önerisi

| Dosya | Kullanım | Süre | Ne arayacağın (İngilizce) |
|-------|----------|------|---------------------------|
| **capture.mp3** | Yem / candy yiyince (eat) | ~0.2–0.5 sn | `game eat sound`, `slurp`, `pop collect`, `bite` |
| **attack.mp3** | AI yılan öldürünce | ~0.3–0.6 sn | `hit`, `punch`, `attack impact`, `swoosh` |
| **powerup.mp3** | Power-up (⚡ / ✖️) toplayınca | ~0.4–0.8 sn | `power up`, `item collect`, `sparkle`, `boost` |
| **victory.mp3** | Level atlama, boss yenme | ~0.5–1.5 sn | `level up`, `victory`, `achievement`, `success` |
| **defeat.mp3** | Oyun bitti (game over) | ~0.5–2 sn | `game over`, `lose`, `fail`, `defeat` |
| **select.mp3** | Menü / ayar tıklama | ~0.1–0.3 sn | `ui click`, `button click`, `menu select`, `tap` |

---

## Nereden bulunur?

- **[Freesound.org](https://freesound.org)** – `game eat`, `power up`, `ui click` vb. aramalar. Lisans: **CC0** veya **CC BY** tercih et.
- **[Mixkit.co – Sound Effects](https://mixkit.co/free-sound-effects/)** – Ücretsiz, indirip kullan.
- **[Pixabay – Sound Effects](https://pixabay.com/sound-effects/)** – `snake`, `eat`, `game over`, `click` aramaları.

İndirdiğin dosya **MP3 değilse** (WAV, OGG vb.) önce MP3’e çevir (ör. [CloudConvert](https://cloudconvert.com), Audacity).

---

## Değiştirdikten sonra

1. Yeni dosyayı **`assets/sounds/`** içine koy.
2. **İsim aynı kalacaksa** (örn. `capture.mp3`) → Sadece eski dosyanın üzerine yaz. Projeyi yeniden çalıştır.
3. **İsim değişecekse** (örn. `eat_new.mp3`) → `src/utils/SoundManager.js` içinde ilgili satırı güncelle:

```js
const SOUNDS = {
    eat: require('../../assets/sounds/eat_new.mp3'),  // capture.mp3 yerine
    // ...
};
```

4. `npx expo start` ile uygulamayı tekrar başlat; sesler yüklenecektir.

---

## Hızlı örnek aramalar (kopyala-yapıştır)

| Efekt | Örnek arama |
|-------|-------------|
| Yem yeme | `game collect sound effect` |
| Vuruş / öldürme | `game hit sound effect` |
| Power-up | `power up collect sound effect` |
| Level up | `level up victory sound` |
| Game over | `game over lose sound` |
| Menü tıklama | `ui button click sound` |

Bu rehberi takip ederek ses efektlerini güvenle değiştirebilirsin.
