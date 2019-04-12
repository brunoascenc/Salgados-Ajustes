// Carrinho
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', loading)
} else {
    loading()
}

function loading() {
    const removerItemButton = document.getElementsByClassName('btn-remover')
    for (let i = 0; i < removerItemButton.length; i++) {
        let button = removerItemButton[i]
        button.addEventListener('click', removerItemCarrinho)
    }

    const quantidade = document.getElementsByClassName('cart-quantity-input')
    for (let i = 0; i < quantidade.length; i++) {
        let input = quantidade[i]
        input.addEventListener('change', mudarQtd)
    }

    const addCarrinho = document.getElementsByClassName('comprar-btn')
    for (let i = 0; i < addCarrinho.length; i++) {
        let button = addCarrinho[i]
        button.addEventListener('click', adicionarClick)
    }
}

function removerItemCarrinho(event) {
    const removerBtn = event.target
    removerBtn.parentElement.parentElement.remove()
    atualizarTotal()
}

function mudarQtd(event) {
    const input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    atualizarTotal()
}

function adicionarClick(event) {
    const button = event.target
    const shopItem = button.parentElement.parentElement
    let titulo = shopItem.getElementsByClassName('produto-title')[0].innerText
    let preco = shopItem.getElementsByClassName('produto-preco')[0].innerText
    let imageSrc = shopItem.getElementsByClassName('produto-img')[0].src
    adicionarItem(titulo, preco, imageSrc)
    atualizarTotal()
}

function adicionarItem(titulo, preco, imageSrc) {
    let carrinhoRow = document.createElement('div')
    carrinhoRow.classList.add('cart-row')
    let carrinhoItens = document.getElementsByClassName('carrinho-produtos')[0]
    let cartItemNome = carrinhoItens.getElementsByClassName('cart-item-title')
    let carrinhoConteudo = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                <span class="cart-item-title">${titulo}</span>
        </div>
            <span class="cart-price cart-column">${preco}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-remover" type="button">X</button>
            </div>`
        carrinhoRow.innerHTML = carrinhoConteudo
    carrinhoItens.append(carrinhoRow)
    carrinhoRow.getElementsByClassName('btn-remover')[0].addEventListener('click', removerItemCarrinho)
            carrinhoRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', mudarQtd)
  
}
  function atualizarTotal() {
            const carrinhoContainer = document.getElementsByClassName('carrinho-produtos')[0]
            const carrinhoRowCont = carrinhoContainer.getElementsByClassName('cart-row')
            total = 0
            for (let i = 0; i < carrinhoRowCont.length; i++) {
            let carrinhoRow= carrinhoRowCont[i]
            let precoItem = carrinhoRow.getElementsByClassName('cart-price')[0]
            let quantidadeItem = carrinhoRow.getElementsByClassName('cart-quantity-input')[0]
            let preco = parseFloat(precoItem.innerText.replace('R$: ', '').replace(',', '.'))
            let quantidade = quantidadeItem.value
            total = total + (preco * quantidade)
        }
        total = Math.round(total * 100) / 100
        document.getElementsByClassName('cart-total-price')[0].innerText = 'R$' + total
}


// Menu Toggle
const toggleAnimation = () => {
    const icon = document.querySelector('.toggle')
    const nav = document.querySelector('.nav-links')
    const navLinks = document.querySelectorAll('.nav-links a')

    icon.addEventListener('click', () => {
        nav.classList.toggle('nav-active')

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = ""
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.4}s`
            }
        })
        icon.classList.toggle('toggleIcon')
    })
}
toggleAnimation();


//Smooth Scroll
function landingScroll(target, duracao) {
    var target = document.querySelector(target)
    let targetPosicao = target.getBoundingClientRect().top
    let pontoPartida = window.pageYOffset
    let distancia = targetPosicao - pontoPartida
    let comecoTempo = null

    function animacaoScroll(tempoAtual) {
        if (comecoTempo = null) pontoPartida = tempoAtual
        let tempoDecorrido = tempoAtual - comecoTempo
        let comeco = ease(tempoDecorrido, pontoPartida, distancia, duracao)
        window.scrollTo(0, comeco)
        if (tempoDecorrido < duracao) requestAnimationFrame(animacaoScroll)
    }

    function ease(t, b, c, d) {
        t /= d / 2
        if (t < 1) return c / 2 * t * t * t * t + b
        t -= 2
        return -c / 2 * (t * t * t * t - 2) + b
    }
    requestAnimationFrame(animacaoScroll)
}

const btnLanding = document.querySelector('.btn-landing')
btnLanding.addEventListener('click', () => {
    landingScroll('#about', 3000)
})

const scroll = new SmoothScroll('.nav-links a[href*="#"]', {
    speed: 300
})



// Mudança BG
function mudarBg() {
    if (window.scrollY > window.innerHeight / 2) {
        document.body.classList.add('mudancabg')
    } else {
        document.body.classList.remove('mudancabg')
    }
}
window.addEventListener('scroll', mudarBg)



// Form Validation
const validarForm = () => {
    const nome = document.getElementById('nomeInput').value
    const endereco = document.getElementById('enderecoInput').value
    const quantidade = document.getElementById('qtdInput').value

    if (nome == "") {
        document.getElementById('mensagem').innerHTML = "Insira seu nome"
        return false

    } else if (endereco == "") {
        document.getElementById('mensagem').innerHTML = "Insira seu endereço"
        return false

    } else if (quantidade == "" || quantidade <= 0) {
        document.getElementById('mensagem').innerHTML = "Informe a quantidade"
        return false

    }
    else {
        alert('Encomenda a caminho')
        return true
    }
}

// Modal
const modalButton = document.getElementsByClassName('btn-finalizar')
const modalBg = document.querySelector('.modal-bg')
const modalClose = document.querySelector('.fechar-modal')

modalButton[0].onclick = function ()  {
     modalBg.classList.add('modal-ativar');
}

modalClose.addEventListener('click', function () {
    modalBg.classList.remove('modal-ativar')
})

window.addEventListener('click', function () {
    if (event.target == modalBg) {
       modalBg.classList.remove('modal-ativar')
    }
})




