export default function renderAddress() {
  render();
}

function render() {
  const contactsHTML = `
      <article class="contacts-article">
        <div class="contacts-address">
            <address>Киев<br>Майдан Независимости 1/2</address>
            <a href="tel:+380965555555">Позвоните нам!<br> +096-555-55-55</a>
        </div>
        <div class="contacts-map">
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2540.5506638799707!2d30.522957331199077!3d50.44946972707442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1suk!2sua!4v1564968231307!5m2!1suk!2sua" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
        </div>
      </article>`;

  const contacts = document.createElement("section");
  contacts.classList.add("contacts");
  contacts.innerHTML = contactsHTML;

  const main = document.querySelector(".main");
  main.insertAdjacentElement("beforeend", contacts);
}
