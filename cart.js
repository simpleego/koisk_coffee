function loadMenu() {
  // 서버로 부터 상품 정보를
  // 가져와서 화면에 표시
}
function showMenu() {
  alert("모카커피 선택");
}

// 주문상품 리스트
orders = {
  아메리카노: { amount: 1, price: 0, total_price: 0 },
  라떼: { amount: 1, price: 0, total_price: 0 },
  모카: { amount: 1, price: 0, total_price: 0 },
};

// 주문상품 리스트 접근 방법 : orders['아메리카노']['amount']

coffee_index = { 아메리카노: 0, 라떼: 1, 모카: 2 };
coffee_id = { 아메리카노: "americano", 라떼: "latte", 모카: "moka" };

btnAmericanoClicked = false;
btnLatteClicked = false;
btnMokaClicked = false;

// 버튼 객체 생성
const btnAmericano = document.querySelector("#btnAmericano");
const btnLatte = document.querySelector("#btnLatte");
const btnMoka = document.querySelector("#btnMoka");

// 아메리카노 메뉴 처리
btnAmericano.addEventListener("click", (e) => {
  orderPreProcess(e);
  if (!btnAmericanoClicked) {
    btnAmericanoClicked = true;
    orderAmericano(e, menu, price);
  } else {
    alert("이미 주문되었습니다 수량으로 조정하세요!!");
  }
});

// 라떼 메뉴 처리
btnLatte.addEventListener("click", (e) => {
  orderPreProcess(e);
  if (!btnLatteClicked) {
    orderLatte(e, menu, price);
    btnLatteClicked = true;
  } else {
    alert("이미 주문되었습니다 수량으로 조정하세요!!");
  }
});

// 모카 메뉴 처리
btnMoka.addEventListener("click", (e) => {
  orderPreProcess(e);
  if (!btnMokaClicked) {
    orderMoka(e, menu, price);
    btnMokaClicked = true;
  } else {
    alert("이미 주문되었습니다 수량으로 조정하세요!!");
  }
});

function orderPreProcess(e) {
  menu = e.target.parentElement.querySelector(".name").innerHTML;
  price = e.target.parentElement.querySelector(".price").innerHTML;
  console.log("menu", menu);
  console.log("price", price);
  orderTitle = document.querySelector("#orderTitle");
  orderTitle.style.display = "block";

  cart = document.querySelector("#cart");
  cart.style.display = "block";

  price = price.replace(",", "");
}

function orderAmericano(event, menu, price) {
  index = coffee_index[menu];
  orders[menu]["price"] = price;
  amount = orders[menu]["amount"];
  total_price_ = price * amount;

  // 장바구니 상품 태그
  item = `
    <span id="menu">${menu}</span>(<span id="price">${price}</span>원)
        수량 : <button id="up">+</button>
        <span id="amount">${amount}</span>
        <button id="down">-</button>
        금액 : <input type="text" id="total_price" value=${total_price_} readonly>
    <button id="del">삭제</button>
`;

  const cartItem = document.querySelector("#cartItem");
  //const orderItem = document.createElement( 'li' )
  const item1 = document.createElement("li");
  item1.innerHTML = item;
  document.getElementById("cartItem").appendChild(item1);

  const up_button = document.querySelector("#up");
  console.log("up_button", up_button);
  up_button.addEventListener("click", function (e) {
    // amount 값을 증가
    orders[menu]["amount"]++;
    if (orders[menu]["amount"] > 10) {
      orders[menu]["amount"] = 10;
      alert("수량은 10개까지 가능합니다.");
    }
    this.parentElement.querySelector("#amount").innerHTML =
      orders[menu]["amount"];
    total_price_ = price * orders[menu]["amount"];
    this.parentElement.querySelector("#total_price").value = total_price_;
  });

  const down_button = document.querySelector("#down");
  down_button.addEventListener("click", function (e) {
    // amount 값을 감소
    amount = this.parentElement.querySelector("#amount").innerHTML;
    amount--;
    if (amount == 0) {
      amount = 1;
      alert("수량은 1이상 이어야 합니다.");
    }
    this.parentElement.querySelector("#amount").innerHTML = amount;

    total_price_ = price * amount;
    console.log("**" + total_price_);
    this.parentElement.querySelector("#total_price").value = total_price_;
  });

  // 주문 삭제 버튼 기능
  noOrder = document.querySelector("#del");
  noOrder.addEventListener("click", function (event) {
    // 아메리카로 버튼 스타일에서 disabled 기능 삭제
    liElement = event.target.parentElement;
    liElement = document.querySelector("#menu").innerText;
    //liElement = liElement.substring(0,liElement.indexOf('('))
    console.log(">>>" + liElement);
    let yn = prompt("정말삭제 하시겠습니까?", "y");
    if (yn === "y") {
      event.target.parentElement.remove();

      // 버튼 주문 카운트 초기화
      console.log("menu" + menu);
      switch (menu) {
        case "아메리카노":
          btnAmericanoClicked = false;
          break;
        case "라떼":
          btnLatteClicked = false;
          break;
        case "모카":
          btnMokaClicked = false;
          break;
      }
    }
  });

  //total_price = price * amount
  //this.parentElement.querySelector("#total_price").value = total_price
  //console.log('price * amount'+price * amount)
}

function orderLatte(event, menu, price) {
  index = coffee_index[menu];
  orders[menu]["price"] = price;
  amount = orders[menu]["amount"];
  total_price_ = price * amount;

  // 장바구니 상품 태그
  item = `
          <span id="menu">${menu}</span>(<span id="price">${price}</span>원)
              수량 : <button id="latteUp">+</button>
              <span id="amount">${amount}</span>
              <button id="latteDown">-</button>
              금액 : <input type="text" id="total_price" value=${total_price_} readonly>
          <button id="del">삭제</button>
      `;

  const cartItem = document.querySelector("#cartItem");
  //const orderItem = document.createElement( 'li' )
  const item1 = document.createElement("li");
  item1.innerHTML = item;
  document.getElementById("cartItem").appendChild(item1);

  const up_button_latte = document.querySelector("#latteUp");
  up_button_latte.addEventListener("click", function (e) {
    // amount 값을 증가
    orders[menu]["amount"]++;
    if (orders[menu]["amount"] > 10) {
      orders[menu]["amount"] = 10;
      alert("수량은 10개까지 가능합니다.");
    }
    this.parentElement.querySelector("#amount").innerHTML =
      orders[menu]["amount"];
    total_price_ = price * orders[menu]["amount"];
    this.parentElement.querySelector("#total_price").value = total_price_;
  });

  const down_button_latte = document.querySelector("#latteDown");
  down_button_latte.addEventListener("click", function (e) {
    // amount 값을 감소
    amount = this.parentElement.querySelector("#amount").innerHTML;
    amount--;
    if (amount == 0) {
      amount = 1;
      alert("수량은 1이상 이어야 합니다.");
    }
    this.parentElement.querySelector("#amount").innerHTML = amount;

    total_price_ = price * amount;
    console.log("**" + total_price_);
    this.parentElement.querySelector("#total_price").value = total_price_;
  });

  // 주문 삭제 버튼 기능
  noOrder = document.querySelector("#del");
  noOrder.addEventListener("click", function (event) {
    // 아메리카로 버튼 스타일에서 disabled 기능 삭제
    liElement = event.target.parentElement;
    liElement = document.querySelector("#menu").innerText;
    //liElement = liElement.substring(0,liElement.indexOf('('))
    console.log(">>>" + liElement);
    let yn = prompt("정말삭제 하시겠습니까?", "y");
    if (yn === "y") {
      event.target.parentElement.remove();

      // 버튼 주문 카운트 초기화
      console.log("menu" + menu);
      switch (menu) {
        case "아메리카노":
          btnAmericanoClicked = false;
          break;
        case "라떼":
          btnLatteClicked = false;
          break;
        case "모카":
          btnMokaClicked = false;
          break;
      }
    }
  });

  //total_price = price * amount
  //this.parentElement.querySelector("#total_price").value = total_price
  //console.log('price * amount'+price * amount)
}

function orderMoka(event, menu, price) {
  index = coffee_index[menu];
  orders[menu]["price"] = price;
  amount = orders[menu]["amount"];
  total_price_ = price * amount;

  // 장바구니 상품 태그
  item = `
          <span id="menu">${menu}</span>(<span id="price">${price}</span>원)
              수량 : <button id="mokaUp">+</button>
              <span id="amount">${amount}</span>
              <button id="mokaDown">-</button>
              금액 : <input type="text" id="total_price" value=${total_price_} readonly>
          <button id="del">삭제</button>
      `;

  const cartItem = document.querySelector("#cartItem");
  //const orderItem = document.createElement( 'li' )
  const item1 = document.createElement("li");
  item1.innerHTML = item;
  document.getElementById("cartItem").appendChild(item1);

  const up_button_moka = document.querySelector("#mokaUp");
  up_button_moka.addEventListener("click", function (e) {
    // amount 값을 증가
    console.log('--->'+orders[menu]["amount"])
    orders[menu]["amount"]++;
    if (orders[menu]["amount"] > 10) {
      orders[menu]["amount"] = 10;
      alert("수량은 10개까지 가능합니다.");
    }
    this.parentElement.querySelector("#amount").innerHTML =
      orders[menu]["amount"];
    total_price_ = price * orders[menu]["amount"];
    this.parentElement.querySelector("#total_price").value = total_price_;
  });

  const down_button_moka = document.querySelector("#mokaDown");
  down_button_moka.addEventListener("click", function (e) {
    // amount 값을 감소
    amount = this.parentElement.querySelector("#amount").innerHTML;
    amount--;
    if (amount == 0) {
      amount = 1;
      alert("수량은 1이상 이어야 합니다.");
    }
    this.parentElement.querySelector("#amount").innerHTML = amount;

    total_price_ = price * amount;
    console.log("**" + total_price_);
    this.parentElement.querySelector("#total_price").value = total_price_;
  });

  // 주문 삭제 버튼 기능
  noOrder = document.querySelector("#del");
  noOrder.addEventListener("click", function (event) {
    // 아메리카로 버튼 스타일에서 disabled 기능 삭제
    liElement = event.target.parentElement;
    liElement = document.querySelector("#menu").innerText;
    //liElement = liElement.substring(0,liElement.indexOf('('))
    console.log(">>>" + liElement);
    let yn = prompt("정말삭제 하시겠습니까?", "y");
    if (yn === "y") {
      event.target.parentElement.remove();

      // 버튼 주문 카운트 초기화
      console.log("menu" + menu);
      switch (menu) {
        case "아메리카노":
          btnAmericanoClicked = false;
          break;
        case "라떼":
          btnLatteClicked = false;
          break;
        case "모카":
          btnMokaClicked = false;
          break;
      }
    }
  });

  //total_price = price * amount
  //this.parentElement.querySelector("#total_price").value = total_price
  //console.log('price * amount'+price * amount)
}