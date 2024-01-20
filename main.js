const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const score = document.getElementById('score')


let scorePoint = 0

canvas.width = canvas.scrollWidth
canvas.height = canvas.scrollHeight

const awan_banyak = []
let frame = 0

window.onload = () => {
    class Player {
        constructor() {
            this.width = 50
            this.height = 50
            this.x = canvas.width / 2 - this.width / 2
            this.y = 0

            this.defaultSpeed = 2
            this.speed = this.defaultSpeed

            this.frame = 0
            this.imageFrame = 0
            this.playerImage = new Image()
        }
        draw() {

            let imageFrame = (this.imageFrame < 10) ? `0${this.imageFrame}` : this.imageFrame

            this.playerImage.src = `assets/player/skeleton-animation_${imageFrame}.png`

            ctx.drawImage(this.playerImage, this.x, this.y, this.width, this.height)
        }
        update() {
            this.y += this.speed

            if (this.frame % 10 == 0) {
                this.imageFrame += 1
                if (this.imageFrame > 19) {
                    this.imageFrame = 0
                }
            }
            this.frame
        }
        move() {
            window.addEventListener('keydown', e => {
                switch (e.key) {
                    case 'a':
                        this.x -= 10
                        break;
                    case 's':
                        this.y += 10
                        break;
                    case 'd':
                        this.x += 10
                        break;
                }
            })
        }
    }

    const player = new Player()
    player.move()

    function handlePlayer() {
        if (player.y < 0 - player.height || player.y > canvas.height) {
            alert('Game Over')
            scorePoint = 0
            score.innerHTML = 'Score : ' + Math.floor(scorePoint)
            let mainLagi = confirm('Main lagi?');
            if (mainLagi) {
                scorePoint = 0;
                awan_banyak.length = 0;
            } else {
                cancelAnimationFrame()
            }
        } else {
            scorePoint += 0.1;
            score.innerHTML = 'Score : ' + Math.floor(scorePoint);
        }
    }


    class Cloud {
        constructor(x) {
            this.x = x
            this.y = canvas.height
            this.width = 150
            this.height = 80
            this.defaultSpeed = 2
            this.speed = this.defaultSpeed

            this.cloudImage = new Image()
        }
        draw() {
            this.cloudImage.src = 'assets/cloud/cloud-02.png'
            ctx.drawImage(this.cloudImage, this.x, this.y, this.width, this.height)
        }
        update() {
            this.y -= this.speed
        }
    }

    function bikinAwan() {
        if (frame % 100 == 0) {
            let randomX = Math.random() * canvas.width - 75
            let randomY = Math.random() * canvas.height - 100
            awan_banyak.push(new Cloud(randomX, randomY))
        }
    }

    function tampilkanAwan() {
        let collided = false;

        for (let i = 0; i < awan_banyak.length; i++) {
            const awan = awan_banyak[i];
            awan.update()
            awan.draw();
            if (collision(awan, player)) {
                collided = true;
            }
        }

        if (collided) {
            player.speed = -player.defaultSpeed;
        } else {
            player.speed = player.defaultSpeed;
        }
    }


    function collision(first, second) {
        return !(
            first.x > second.x + second.width ||
            first.x + first.width < second.x ||
            first.y > second.y + second.height ||
            first.y + first.height < second.y
        );
    }


    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        tampilkanAwan()
        player.update()
        player.draw()
        bikinAwan()
        handlePlayer()

        frame++
        requestAnimationFrame(animate)
    }

    let playGame = confirm('Apakah Siap memulai Game?')

    if (playGame) {
        const musik = new Audio()
        musik.src = 'assets/bg-musik.mp3'

        document.addEventListener('click', () => {
            musik.play()
        })

        animate()
    }


}