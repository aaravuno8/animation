(function (dball) {
  document
    .querySelector(".droppingBall")
    .appendChild(document.createElement("canvas"));
  const canvas = document.querySelector("canvas");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var c = canvas.getContext("2d");

  var mouse = {
    x: undefined,
    y: undefined,
  };

  var maxRadius = 40;
  // var minRadius = 2;

  var colorArray = ["#2C3E50", "#E74C3C", "#ECF0F1", "#3498DB", "#2980B9"];

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    dball.init();
  });

  class Circle {
    constructor(x, y, dx, dy, radius) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      this.minRadius = radius;
      this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

      this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.stroke();
        c.fillStyle = this.color;
        c.fill();
      };

      this.update = () => {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
          this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
          this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        // Interactivity

        if (
          mouse.x - this.x < 50 &&
          mouse.x - this.x > -50 &&
          mouse.y - this.y < 50 &&
          mouse.y - this.y > -50
        ) {
          if (this.radius < maxRadius) {
            this.radius += 1;
          }
        } else if (this.radius > this.minRadius) {
          this.radius -= 1;
        }

        this.draw();
      };
    }
  }

  var circleArray = [];

  dball.init = function () {
    console.log("in init");
    circleArray = [];
    document.querySelector("head").appendChild(
      document.createRange().createContextualFragment(`<style>
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap');
      body,
      html {
          margin: 0;
          height: 100%;
          width: 100%;
          overflow: hidden;
          pointer-events: none;
      }
      .droppingBallTitle{
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          box-shadow: 30px 30px 50px grey;
          background-image: linear-gradient(rgba(18, 194, 233), rgba(196, 113, 237), rgba(246, 79, 89, 0.95));
          padding: 40px;
          border-radius: 50px;
          color: #2C3E50;
          
          font-size: 100px;
          width: fit-content;
          height: fit-content;
          font-family: 'Montserrat';
      }
  </style>`)
    );
    dball.text();

    for (i = 0; i < 900; i++) {
      var radius = Math.random() * 3 + 1;
      var x = Math.random() * (innerWidth - radius * 2) + radius;
      var y = Math.random() * (innerHeight - radius * 2) + radius;
      var dx = (Math.random() - 0.5) * 10;
      var dy = (Math.random() - 0.5) * 10;

      circleArray.push(new Circle(x, y, dx, dy, radius));
    }
  };

  dball.animate = function () {
    requestAnimationFrame(dball.animate);

    c.clearRect(0, 0, innerWidth, innerHeight);
    for (i = 0; i < circleArray.length; i++) {
      circleArray[i].update();
    }
  };
  dball.text = function () {
    [...document.querySelectorAll(".droppingBall")].forEach((element) => {
      let div = document.createElement('div');
      div.innerText = element.title;
      div.classList = "droppingBallTitle";
      console.log(element);
      console.log(div);
      element.appendChild(div);
    });
  };
})((window.dball = {}));

dball.init();
dball.animate();