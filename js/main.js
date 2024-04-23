window.onload = function() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');

    const window_height = window.innerHeight;
    const window_width = window.innerWidth;

    canvas.height = window_height;
    canvas.width = window_width;

    canvas.style.background = '#ff8';

    class Circle {
        constructor(x, y, radius, color, text, speedX, speedY) {
            this.posX = x;
            this.posY = y;
            this.radius = radius;
            this.color = color;
            this.text = text;
            this.speedX = speedX;
            this.speedY = speedY;
        }

        update() {
            this.posX += this.speedX;
            this.posY += this.speedY;

            // Verificar los bordes del lienzo y cambiar la dirección si es necesario
            if (this.posX + this.radius >= window_width || this.posX - this.radius <= 0) {
                this.speedX = -this.speedX;
            }
            if (this.posY + this.radius >= window_height || this.posY - this.radius <= 0) {
                this.speedY = -this.speedY;
            }
        }

        draw(context) {
            context.beginPath();
            context.strokeStyle = this.color;
            context.lineWidth = 4; // Aumentar el ancho del contorno

            // Dibujar el círculo
            context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
            context.stroke();

            // Configurar propiedades para el texto
            context.fillStyle = 'black';
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.font = `${this.radius / 2}px Arial`;

            // Dibujar el texto en el centro del círculo
            context.fillText(this.text, this.posX, this.posY);
        }
    }

    const arrayCircle = [];
    const numCircles = 10;

    for (let i = 0; i < numCircles; i++) {
        let randomX, randomY, randomRadius, randomColor, text;
        let speedX = (Math.random() - 0.5) * 2; // Velocidad aleatoria en X
        let speedY = (Math.random() - 0.5) * 2; // Velocidad aleatoria en Y

        randomRadius = Math.floor(Math.random() * 80) + 20; // Radio aleatorio
        randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16); // Color aleatorio

        // Ajustar la posición aleatoria para que el círculo esté completamente visible en el lienzo
        randomX = Math.random() * (window_width - 2 * randomRadius) + randomRadius;
        randomY = Math.random() * (window_height - 2 * randomRadius) + randomRadius;

        text = "Tec " + (i + 1); // Texto "Tec 1", "Tec 2", etc.

        const newCircle = new Circle(randomX, randomY, randomRadius, randomColor, text, speedX, speedY);

        arrayCircle.push(newCircle);
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo

        arrayCircle.forEach(circle => {
            circle.update();
            circle.draw(ctx);
        });

        requestAnimationFrame(animate);
    }

    animate();
};
