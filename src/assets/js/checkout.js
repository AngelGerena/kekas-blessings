// Stripe checkout. Each "Buy Online" button posts the item to a Netlify
// Function which creates a Stripe Checkout Session and returns its URL.
// Activates only when Stripe is enabled in the admin (site.json).
(function () {
  var buttons = document.querySelectorAll(".buy-btn");
  if (!buttons.length) return;

  buttons.forEach(function (btn) {
    btn.addEventListener("click", async function () {
      var original = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Loading...";
      try {
        var res = await fetch("/.netlify/functions/create-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: btn.dataset.name,
            price: Number(btn.dataset.price)
          })
        });
        var data = await res.json();
        if (data && data.url) {
          window.location.href = data.url;
        } else {
          throw new Error(data.error || "Checkout could not be started.");
        }
      } catch (err) {
        alert("Sorry, online checkout is temporarily unavailable. Please book directly or contact us. (" + err.message + ")");
        btn.disabled = false;
        btn.textContent = original;
      }
    });
  });
})();
