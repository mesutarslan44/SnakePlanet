# SnakePlanet – Git push adımları

Tüm değişiklikler commitlendi. Push bu ortamdan yapılamadı (GitHub bağlantı hatası).  
**Kendi bilgisayarında** aşağıdakileri çalıştır:

```bash
cd C:\Users\mstrs\.gemini\SnakePlanet

# İsteğe bağlı: E-posta ve isim (henüz yapılmadıysa)
git config user.email "mstrsln44@gmail.com"
git config user.name "mesutarslan44"

# Remote zaten ekli: https://github.com/mesutarslan44/SnakePlanet
git remote -v

# Push (master → origin)
git push -u origin master
```

**Proxy kullanıyorsan** ve `Failed to connect via 127.0.0.1` alıyorsan:

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

Sonra tekrar `git push -u origin master` dene.

---

## Bu commit’te ne var?

- **Avlar (yem):** Daha gerçekçi görünüm – yuvarlak zemin, toprak rengi gölge, emoji vurgusu  
- **İstatistikler & başarımlar:** Null-safe, getProgress genişletildi, varsayılan veriler  
- **Petek arka plan:** Orijinal hexagon (Slither.io tarzı) grid  
- **Oyun alanı:** 4x büyük dünya, INITIAL_FOOD 44, MAX_FOOD 72, AI 6  
- **Power-up:** ⚡ Hız, ✖️ 2x puan  
- **Boss:** Daha uzun, daha akıllı, kuyruk çarpması düzeltmeleri  
- **Combo:** Yarı saydam, küçük, köşede  
- **Ses, UI, vignette** ve diğer UX iyileştirmeleri  

İlk commit: `2f9716f` – 52 dosya, 16600+ satır.
