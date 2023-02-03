const express = require('express');
const app = express();

// これがあるとJSON形式でファイルをPOSTすることができる
app.use(express.json());

app.listen(8000, console.log("サーバーが起動しました。"))

app.get("/", (req, res) => {
  res.send("チュートリアルへようこそ")
});

// お客様情報をサーバーに置いておく
const customers = [
  { title: "田中", id: 1 },
  { title: "斉藤", id: 2 },
  { title: "山田", id: 3 },
  { title: "加藤", id: 4 },
  { title: "山中", id: 5 },
];

// データを取得できるようにする(GET)
app.get("/api/customers", (req, res) => {
  res.send(customers);
});

app.get("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  res.send(customer);
});

// データを送信(POST), 保存はされない
app.post("/api/customers", (req, res) => {
  const customer = {
    title: req.body.title,
    id: customers.length + 1,
  };
  customers.push(customer);
  res.send(customers);
})

// データを更新(PUT)
app.put("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  customer.title = req.body.title;
  res.send(customer);
})

// データを削除(DELETE)
app.delete("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));

  // idを返す
  const index = customers.indexOf(customer);

  // splice関数指定したものを一個だけ削除している
  customers.splice(index, 1);

  res.send(customers);
})
