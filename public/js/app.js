document.addEventListener("keydown", e => {
  const key = e.key.toLowerCase();
  if ((e.ctrlKey || e.metaKey) && e.code === 'KeyS') {
    e.preventDefault();
    e.stopImmediatePropagation();
    return false;
  } if (
    key === "f12" ||
    (e.ctrlKey && e.shiftKey && ["i", "c", "j"].includes(key)) ||
    (e.ctrlKey && key === "u") ||
    (e.metaKey && e.altKey && key === "i")
  ) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return false;
  }
});

document.addEventListener("keypress", e => {
  if ((e.ctrlKey || e.metaKey) && e.code === 'KeyS') {
    e.preventDefault();
    e.stopImmediatePropagation();
    return false;
  }
});

document.addEventListener("contextmenu", e => e.preventDefault());
