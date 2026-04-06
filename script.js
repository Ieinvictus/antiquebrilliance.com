
// 🚫 Disable Right Click
document.addEventListener("contextmenu", e => e.preventDefault());

// 🚫 Disable Copy / Select
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

// ✅ DEVTOOLS DETECTION (DESKTOP ONLY)
setInterval(function(){

  // 🔥 mobile skip
  if (window.innerWidth < 900) return;

  const widthDiff = window.outerWidth - window.innerWidth;
  const heightDiff = window.outerHeight - window.innerHeight;

  if (widthDiff > 200 || heightDiff > 200) {
    document.body.innerHTML = "<h1 style='color:white;text-align:center;margin-top:20%'>Access Restricted</h1>";
  }

}, 1000);

// 🚫 Console disable
(function(){
  try{
    console.log = function(){};
    console.warn = function(){};
    console.error = function(){};
  }catch(e){}
})();

// 🚫 Drag disable
document.addEventListener("dragstart", e => e.preventDefault());

// 🚫 Tab switch blur
document.addEventListener("visibilitychange", function(){
  document.body.style.filter = document.hidden ? "blur(12px)" : "none";
});
