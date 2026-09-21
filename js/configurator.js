document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cfgForm');
  if (!form) return;

  const fmt = (n) => '$' + n.toLocaleString('en-US');
  const checked = (name) => form.querySelector('input[name="' + name + '"]:checked');

  const out = {
    model: document.getElementById('sumModel'),
    color: document.getElementById('sumColor'),
    wheels: document.getElementById('sumWheels'),
    interior: document.getElementById('sumInterior'),
    total: document.getElementById('sumTotal'),
    preview: document.getElementById('cfgPreview'),
    swatch: document.getElementById('cfgSwatch'),
    img: document.getElementById('cfgImg'),
  };

  function update() {
    const model = checked('model');
    const color = checked('color');
    const wheels = checked('wheels');
    const interior = checked('interior');

    const total = [model, color, wheels, interior]
      .reduce((sum, el) => sum + Number(el.dataset.price), 0);

    out.model.textContent = model.dataset.name;
    out.color.textContent = color.dataset.name;
    out.wheels.textContent = wheels.dataset.name;
    out.interior.textContent = interior.dataset.name;
    out.total.textContent = fmt(total);
    out.swatch.style.setProperty('--car', color.value);
    out.img.src = 'images/cars/' + model.value + '-' + color.dataset.key + '.png';
    out.img.alt = model.dataset.name + ', ' + color.dataset.name;
  }

  form.addEventListener('change', update);
  update();
});
