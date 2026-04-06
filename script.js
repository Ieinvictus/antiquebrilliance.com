// 🚫 Disable Right Click
document.addEventListener("contextmenu", e => e.preventDefault());

// 🚫 Disable Copy / Cut / Select
["copy","cut","selectstart"].forEach(evt=>{
  document.addEventListener(evt, e => e.preventDefault());
});

// 🚫 Disable Keyboard Shortcuts
document.addEventListener("keydown", function(e){

  if (e.key === "F12") e.preventDefault();

  if (e.ctrlKey && e.shiftKey && ["I","J","C"].includes(e.key)) {
    e.preventDefault();
  }

  if (e.ctrlKey && ["u","s"].includes(e.key.toLowerCase())) {
    e.preventDefault();
  }

});

// 🚫 DevTools Detection (safe)
setInterval(function(){
  const widthDiff = window.outerWidth - window.innerWidth;
  const heightDiff = window.outerHeight - window.innerHeight;

  if (widthDiff > 160 || heightDiff > 160) {
    document.body.innerHTML = "<h1 style='color:white;text-align:center;margin-top:20%'>Access Restricted</h1>";
  }
}, 1000);

// 🚫 Console disable (safe override)
(function(){
  try{
    console.log = function(){};
    console.warn = function(){};
    console.error = function(){};
  }catch(e){}
})();

// 🚫 Drag disable
document.addEventListener("dragstart", e => e.preventDefault());

// 🚫 Screenshot / tab switch blur
document.addEventListener("visibilitychange", function(){
  document.body.style.filter = document.hidden ? "blur(12px)" : "none";
});

// 🚫 Safe iframe protection (NO ERROR)
try {
  if (window.self !== window.top) {
    // instead of redirect (blocked), just hide content
    document.body.innerHTML = "<h1 style='color:white;text-align:center;margin-top:20%'>Embedding Not Allowed</h1>";
  }
} catch (e) {
  // cross-origin safe fallback
  document.body.innerHTML = "<h1 style='color:white;text-align:center;margin-top:20%'>Restricted</h1>";
}