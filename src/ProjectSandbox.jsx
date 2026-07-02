import React, { useState, useEffect, useRef } from "react";

// ==========================================
// 1. BANKING TERMINAL SANDBOX (Core Java App)
// ==========================================
export function BankingTerminalSandbox() {
  const [logs, setLogs] = useState([
    "Initializing DibyaBank Core Terminal...",
    "System Ready (Core Java console wrapper).",
    "===========================================",
    "DIBYABANK CORE SYSTEM v1.0.0",
    "===========================================",
    "1. Open Account",
    "2. Deposit Funds",
    "3. Withdraw Funds",
    "4. Balance Query",
    "5. Exit",
    "Enter your choice (1-5):"
  ]);
  const [inputVal, setInputVal] = useState("");
  const [stage, setStage] = useState("menu"); // menu, open_name, deposit_amount, withdraw_amount
  const [accounts, setAccounts] = useState({ "Guest User": 5000 });
  const [activeAccount, setActiveAccount] = useState("Guest User");
  const terminalEndRef = useRef(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  const handleCommand = (e) => {
    e.preventDefault();
    const val = inputVal.trim();
    if (!val) return;

    // Echo command
    setLogs((prev) => [...prev, `> ${val}`]);
    setInputVal("");

    if (stage === "menu") {
      switch (val) {
        case "1":
          setLogs((prev) => [...prev, "Enter Account Holder's Name:"]);
          setStage("open_name");
          break;
        case "2":
          setLogs((prev) => [
            ...prev,
            `Active Account: ${activeAccount}`,
            "Enter deposit amount (INR):"
          ]);
          setStage("deposit_amount");
          break;
        case "3":
          setLogs((prev) => [
            ...prev,
            `Active Account: ${activeAccount} (Current Balance: INR ${accounts[activeAccount]})`,
            "Enter withdrawal amount (INR):"
          ]);
          setStage("withdraw_amount");
          break;
        case "4":
          setLogs((prev) => [
            ...prev,
            "-------------------------------------------",
            "BALANCE QUERY RESULTS",
            `Account Name: ${activeAccount}`,
            `Current Balance: INR ${accounts[activeAccount]}`,
            "-------------------------------------------",
            "1. Open Account",
            "2. Deposit Funds",
            "3. Withdraw Funds",
            "4. Balance Query",
            "5. Exit",
            "Enter your choice (1-5):"
          ]);
          break;
        case "5":
          setLogs((prev) => [
            ...prev,
            "Closing terminal session. Goodbye!",
            "Type 'reset' or reload sandbox to restart."
          ]);
          break;
        case "reset":
          setAccounts({ "Guest User": 5000 });
          setActiveAccount("Guest User");
          setLogs([
            "Initializing DibyaBank Core Terminal...",
            "System Ready (Core Java console wrapper).",
            "===========================================",
            "DIBYABANK CORE SYSTEM v1.0.0",
            "===========================================",
            "1. Open Account",
            "2. Deposit Funds",
            "3. Withdraw Funds",
            "4. Balance Query",
            "5. Exit",
            "Enter your choice (1-5):"
          ]);
          break;
        default:
          setLogs((prev) => [
            ...prev,
            "Invalid Option! Please select from options 1-5.",
            "Enter your choice (1-5):"
          ]);
      }
    } else if (stage === "open_name") {
      if (accounts[val] !== undefined) {
        setLogs((prev) => [
          ...prev,
          `[ERROR] Account with name '${val}' already exists.`,
          "Enter your choice (1-5):"
        ]);
      } else {
        setAccounts((prev) => ({ ...prev, [val]: 0 }));
        setActiveAccount(val);
        setLogs((prev) => [
          ...prev,
          `[SUCCESS] Account successfully opened for: ${val}`,
          `Active account switched to: ${val}`,
          "Enter your choice (1-5):"
        ]);
      }
      setStage("menu");
    } else if (stage === "deposit_amount") {
      const amt = parseFloat(val);
      if (isNaN(amt) || amt <= 0) {
        setLogs((prev) => [
          ...prev,
          "[ERROR] Invalid amount. Deposit failed.",
          "Enter your choice (1-5):"
        ]);
      } else {
        setAccounts((prev) => ({
          ...prev,
          [activeAccount]: prev[activeAccount] + amt
        }));
        setLogs((prev) => [
          ...prev,
          `[SUCCESS] Deposited INR ${amt} into '${activeAccount}'.`,
          `New Balance: INR ${accounts[activeAccount] + amt}`,
          "Enter your choice (1-5):"
        ]);
      }
      setStage("menu");
    } else if (stage === "withdraw_amount") {
      const amt = parseFloat(val);
      if (isNaN(amt) || amt <= 0) {
        setLogs((prev) => [
          ...prev,
          "[ERROR] Invalid amount. Withdrawal failed.",
          "Enter your choice (1-5):"
        ]);
      } else if (amt > accounts[activeAccount]) {
        setLogs((prev) => [
          ...prev,
          `[ERROR] Insufficient funds! Maximum available: INR ${accounts[activeAccount]}`,
          "Enter your choice (1-5):"
        ]);
      } else {
        setAccounts((prev) => ({
          ...prev,
          [activeAccount]: prev[activeAccount] - amt
        }));
        setLogs((prev) => [
          ...prev,
          `[SUCCESS] Withdrew INR ${amt} from '${activeAccount}'.`,
          `New Balance: INR ${accounts[activeAccount] - amt}`,
          "Enter your choice (1-5):"
        ]);
      }
      setStage("menu");
    }
  };

  return (
    <div className="sandbox-card sandbox-terminal-wrap">
      <div className="terminal-inner">
        <div className="terminal-header-small">
          <div className="terminal-dots">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
          </div>
          <span>Java Console Virtual Machine</span>
        </div>
        <div className="terminal-content">
          {logs.map((log, index) => (
            <div key={index} className="terminal-text-line">
              {log}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>
        <form onSubmit={handleCommand} className="terminal-input-row">
          <span className="terminal-prompt-indicator">&gt;</span>
          <input
            type="text"
            className="terminal-input-box"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type value & hit Enter..."
            autoFocus
          />
        </form>
      </div>
      <div className="sandbox-info-panel">
        <h5>Accounts Database</h5>
        <div className="sandbox-accounts-list">
          {Object.keys(accounts).map((acc) => (
            <div
              key={acc}
              className={`sandbox-account-item ${acc === activeAccount ? "active" : ""}`}
              onClick={() => setActiveAccount(acc)}
            >
              <span>{acc}</span>
              <strong>INR {accounts[acc]}</strong>
            </div>
          ))}
        </div>
        <p className="sandbox-tip-text">
          <i className="bi bi-info-circle"></i> Click accounts list to switch active user session.
        </p>
      </div>
    </div>
  );
}

// ==========================================
// 2. CONNECT GAMES SANDBOX (Tic-Tac-Toe vs AI)
// ==========================================
export function ConnectGamesSandbox() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ player: 0, ai: 0, draws: 0 });
  const [difficulty, setDifficulty] = useState("unbeatable"); // easy, unbeatable

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    if (squares.every((square) => square !== null)) {
      return "Draw";
    }
    return null;
  };

  // Minimax Unbeatable AI
  const minimax = (tempBoard, depth, isMaximizing) => {
    const currentWin = checkWinner(tempBoard);
    if (currentWin === "O") return 10 - depth;
    if (currentWin === "X") return depth - 10;
    if (currentWin === "Draw") return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (tempBoard[i] === null) {
          tempBoard[i] = "O";
          let scoreVal = minimax(tempBoard, depth + 1, false);
          tempBoard[i] = null;
          bestScore = Math.max(bestScore, scoreVal);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (tempBoard[i] === null) {
          tempBoard[i] = "X";
          let scoreVal = minimax(tempBoard, depth + 1, true);
          tempBoard[i] = null;
          bestScore = Math.min(bestScore, scoreVal);
        }
      }
      return bestScore;
    }
  };

  const getBestMove = (squares) => {
    let bestScore = -Infinity;
    let move = -1;
    for (let i = 0; i < 9; i++) {
      if (squares[i] === null) {
        squares[i] = "O";
        let scoreVal = minimax(squares, 0, false);
        squares[i] = null;
        if (scoreVal > bestScore) {
          bestScore = scoreVal;
          move = i;
        }
      }
    }
    return move;
  };

  const getEasyMove = (squares) => {
    const emptyIndices = squares
      .map((sq, index) => (sq === null ? index : null))
      .filter((v) => v !== null);
    if (emptyIndices.length === 0) return -1;
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  };

  const handleCellClick = (index) => {
    if (board[index] || winner || !isXNext) return;

    // Player Move (X)
    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsXNext(false);

    const winResult = checkWinner(newBoard);
    if (winResult) {
      handleGameEnd(winResult);
    }
  };

  // AI Turn effect
  useEffect(() => {
    if (isXNext || winner) return;

    const timer = setTimeout(() => {
      const newBoard = [...board];
      let aiMove = -1;

      if (difficulty === "unbeatable") {
        aiMove = getBestMove(newBoard);
      } else {
        aiMove = getEasyMove(newBoard);
      }

      if (aiMove !== -1) {
        newBoard[aiMove] = "O";
        setBoard(newBoard);
        setIsXNext(true);

        const winResult = checkWinner(newBoard);
        if (winResult) {
          handleGameEnd(winResult);
        }
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [isXNext, board, winner]);

  const handleGameEnd = (result) => {
    setWinner(result);
    setScore((prev) => {
      if (result === "X") return { ...prev, player: prev.player + 1 };
      if (result === "O") return { ...prev, ai: prev.ai + 1 };
      return { ...prev, draws: prev.draws + 1 };
    });
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsXNext(true);
  };

  return (
    <div className="sandbox-card ttt-sandbox">
      <div className="game-status-board">
        <div className="score-widget">
          <div>
            <span>Player (X)</span>
            <strong>{score.player}</strong>
          </div>
          <div>
            <span>Draws</span>
            <strong>{score.draws}</strong>
          </div>
          <div>
            <span>AI (O)</span>
            <strong>{score.ai}</strong>
          </div>
        </div>
        <div className="difficulty-selectors">
          <button
            className={difficulty === "easy" ? "active" : ""}
            onClick={() => setDifficulty("easy")}
          >
            Easy Mode
          </button>
          <button
            className={difficulty === "unbeatable" ? "active" : ""}
            onClick={() => setDifficulty("unbeatable")}
          >
            Unbeatable AI
          </button>
        </div>
      </div>

      <div className="ttt-board">
        {board.map((cell, idx) => (
          <button
            key={idx}
            className={`ttt-cell cell-${cell} ${winner ? "game-over" : ""}`}
            onClick={() => handleCellClick(idx)}
            disabled={cell !== null || winner !== null || !isXNext}
          >
            {cell}
          </button>
        ))}
      </div>

      <div className="ttt-actions">
        <span className="game-message">
          {winner
            ? winner === "Draw"
              ? "It's a Draw! 🤝"
              : winner === "X"
              ? "You Won! 🎉"
              : "AI Won! 🤖"
            : isXNext
            ? "Your turn (X)"
            : "AI is thinking (O)..."}
        </span>
        <button className="btn btn-accent btn-sm" onClick={resetGame}>
          <i className="bi bi-arrow-clockwise"></i> Play Again
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 3. FINANCE DASHBOARD SANDBOX
// ==========================================
export function FinanceDashboardSandbox() {
  const [balance, setBalance] = useState(25800);
  const [income, setIncome] = useState(45000);
  const [expense, setExpense] = useState(19200);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Utilities");
  const [type, setType] = useState("expense");
  const [transactions, setTransactions] = useState([
    { id: 1, desc: "Internship Stipend", amount: 15000, type: "income", category: "Stipend", date: "July 01" },
    { id: 2, desc: "Grocery Shopping", amount: 3200, type: "expense", category: "Groceries", date: "June 28" },
    { id: 3, desc: "Broadband Wi-Fi", amount: 1200, type: "expense", category: "Utilities", date: "June 25" },
    { id: 4, desc: "AWS Server Hosting", amount: 2400, type: "expense", category: "Utilities", date: "June 20" }
  ]);

  const categories = ["Utilities", "Groceries", "Dining", "Entertainment", "Stipend", "Other"];

  const handleAddTransaction = (e) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (!desc || isNaN(amt) || amt <= 0) return;

    const newTx = {
      id: Date.now(),
      desc,
      amount: amt,
      type,
      category,
      date: "Today"
    };

    setTransactions((prev) => [newTx, ...prev]);
    if (type === "expense") {
      setExpense((prev) => prev + amt);
      setBalance((prev) => prev - amt);
    } else {
      setIncome((prev) => prev + amt);
      setBalance((prev) => prev + amt);
    }

    setDesc("");
    setAmount("");
  };

  // Compute category budgets
  const getCategorySpend = (catName) => {
    return transactions
      .filter((t) => t.category === catName && t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
  };

  return (
    <div className="sandbox-card fd-sandbox">
      <div className="fd-metrics-row">
        <div className="fd-metric-box">
          <span>Net Balance</span>
          <strong>INR {balance.toLocaleString()}</strong>
        </div>
        <div className="fd-metric-box text-success">
          <span>Total Income</span>
          <strong>+INR {income.toLocaleString()}</strong>
        </div>
        <div className="fd-metric-box text-danger">
          <span>Total Expense</span>
          <strong>-INR {expense.toLocaleString()}</strong>
        </div>
      </div>

      <div className="fd-workspace">
        <form onSubmit={handleAddTransaction} className="fd-form card-surface">
          <h6>Add Transaction</h6>
          <input
            type="text"
            placeholder="Description (e.g. Cinema Ticket)"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
          <div className="fd-form-row">
            <input
              type="number"
              placeholder="Amount (INR)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="fd-toggle-row">
            <button
              type="button"
              className={type === "expense" ? "active btn-danger" : ""}
              onClick={() => setType("expense")}
            >
              Expense
            </button>
            <button
              type="button"
              className={type === "income" ? "active btn-success" : ""}
              onClick={() => setType("income")}
            >
              Income
            </button>
          </div>
          <button type="submit" className="btn btn-accent btn-sm w-100">
            Submit Transaction
          </button>
        </form>

        <div className="fd-logs-section">
          <h6>Recent Statements</h6>
          <div className="fd-tx-list">
            {transactions.map((tx) => (
              <div key={tx.id} className={`fd-tx-item tx-type-${tx.type}`}>
                <div>
                  <strong>{tx.desc}</strong>
                  <span>
                    {tx.category} • {tx.date}
                  </span>
                </div>
                <strong className={tx.type === "expense" ? "text-danger" : "text-success"}>
                  {tx.type === "expense" ? "-" : "+"}INR {tx.amount}
                </strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fd-budgets">
        <h6>Budget Allocation Breakdown</h6>
        {categories.slice(0, 4).map((cat) => {
          const spend = getCategorySpend(cat);
          const limit = cat === "Utilities" ? 8000 : cat === "Groceries" ? 6000 : 5000;
          const percentage = Math.min(Math.round((spend / limit) * 100), 100);
          return (
            <div key={cat} className="fd-budget-item">
              <div className="fd-budget-info">
                <span>{cat}</span>
                <span>
                  INR {spend} / INR {limit}
                </span>
              </div>
              <div className="fd-budget-track">
                <div
                  className={`fd-budget-fill ${percentage > 90 ? "bg-danger" : percentage > 70 ? "bg-warning" : "bg-accent"}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// 4. E-COMMERCE STOREFRONT SANDBOX
// ==========================================
export function ECommerceSandbox() {
  const [products] = useState([
    { id: 1, name: "Mechanical Keyboard", price: 3499, category: "Peripherals", icon: "bi-keyboard", rating: 4.8 },
    { id: 2, name: "Ergonomic Office Chair", price: 8999, category: "Furniture", icon: "bi-chair", rating: 4.6 },
    { id: 3, name: "Wireless Headphones", price: 4999, category: "Audio", icon: "bi-headphones", rating: 4.7 },
    { id: 4, name: "HD Streaming Webcam", price: 2999, category: "Peripherals", icon: "bi-camera-video", rating: 4.5 },
    { id: 5, name: "RGB LED Gaming Desk Light", price: 1599, category: "Furniture", icon: "bi-lightbulb", rating: 4.3 },
    { id: 6, name: "Curved UltraWide Monitor", price: 18999, category: "Peripherals", icon: "bi-display", rating: 4.9 }
  ]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(null); // null, processing, shipped, delivered

  const handleAddToCart = (prod) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === prod.id);
      if (existing) {
        return prev.map((item) =>
          item.id === prod.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...prod, qty: 1 }];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutStep("processing");

    setTimeout(() => {
      setCheckoutStep("shipped");
    }, 1800);

    setTimeout(() => {
      setCheckoutStep("delivered");
    }, 3600);
  };

  const filteredProducts = products.filter((prod) => {
    const matchesSearch = prod.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || prod.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="sandbox-card ec-sandbox">
      <div className="ec-shop-header">
        <div className="ec-search-box">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Search storefront..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="ec-cart-btn btn btn-ghost btn-sm" onClick={() => setIsCartOpen(true)}>
          <i className="bi bi-cart3"></i> Cart
          <span className="badge bg-accent text-dark">{cartCount}</span>
        </button>
      </div>

      <div className="ec-category-tabs">
        {["All", "Peripherals", "Furniture", "Audio"].map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {checkoutStep ? (
        <div className="ec-checkout-loader card-surface">
          <i className={`bi ${checkoutStep === "delivered" ? "bi-check-circle-fill text-success" : "bi-truck text-accent animate-pulse"}`} style={{ fontSize: "3rem" }}></i>
          <h4>
            {checkoutStep === "processing"
              ? "Processing Store Payment..."
              : checkoutStep === "shipped"
              ? "Package Shipped from Warehouse!"
              : "Delivered Successfully!"}
          </h4>
          <div className="ec-progress-tracker">
            <span className="step active">Order Placed</span>
            <span className={`step ${checkoutStep !== "processing" ? "active" : ""}`}>Shipped</span>
            <span className={`step ${checkoutStep === "delivered" ? "active" : ""}`}>Arrived</span>
          </div>
          {checkoutStep === "delivered" && (
            <button
              className="btn btn-accent btn-sm mt-3"
              onClick={() => {
                setCheckoutStep(null);
                setCart([]);
              }}
            >
              Back to Shopping
            </button>
          )}
        </div>
      ) : (
        <div className="ec-product-grid">
          {filteredProducts.map((prod) => (
            <div key={prod.id} className="ec-product-card card-surface">
              <div className="ec-prod-icon">
                <i className={`bi ${prod.icon}`}></i>
              </div>
              <div className="ec-prod-info">
                <h6>{prod.name}</h6>
                <div className="rating-box">
                  <i className="bi bi-star-fill text-warning"></i>
                  <span>{prod.rating}</span>
                </div>
                <strong>INR {prod.price.toLocaleString()}</strong>
              </div>
              <button className="btn btn-accent btn-sm" onClick={() => handleAddToCart(prod)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Cart Slider */}
      {isCartOpen && (
        <div className="ec-cart-drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="ec-cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h5>Shopping Cart ({cartCount})</h5>
              <button className="close-btn" onClick={() => setIsCartOpen(false)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="drawer-content">
              {cart.length === 0 ? (
                <div className="empty-cart-message">
                  <i className="bi bi-bag-x"></i>
                  <p>Your shopping cart is empty.</p>
                </div>
              ) : (
                <div className="cart-items-list">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <i className={`bi ${item.icon}`}></i>
                      <div className="item-details">
                        <h6>{item.name}</h6>
                        <span>
                          Qty: {item.qty} × INR {item.price}
                        </span>
                      </div>
                      <button className="remove-item-btn" onClick={() => handleRemoveFromCart(item.id)}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="drawer-footer">
                <div className="subtotal-row">
                  <span>Grand Total:</span>
                  <strong>INR {cartTotal.toLocaleString()}</strong>
                </div>
                <button className="btn btn-accent w-100" onClick={handleCheckout}>
                  Confirm Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 5. FACE RECOGNITION ATTENDANCE SANDBOX
// ==========================================
export function FaceRecognitionSandbox() {
  const [scanning, setScanning] = useState(false);
  const [streamActive, setStreamActive] = useState(false);
  const [scannedLogs, setScannedLogs] = useState([
    { name: "Admin Reviewer", id: "CS-2026-001", time: "10:14:02 AM", status: "Verified" }
  ]);
  const [scanMessage, setScanMessage] = useState("Camera stream offline.");

  const startScanning = () => {
    setStreamActive(true);
    setScanning(true);
    setScanMessage("Searching for biometric anchors...");

    // Simulated scanning timeline
    setTimeout(() => {
      setScanMessage("Face Detected: Matching matrices...");
    }, 1200);

    setTimeout(() => {
      const studentDatabase = [
        { name: "Dibyajyoti Mohanty", id: "SUIIT-BTECH-25", time: new Date().toLocaleTimeString(), status: "Success" },
        { name: "Instructor Ray", id: "SUIIT-FAC-008", time: new Date().toLocaleTimeString(), status: "Success" },
        { name: "External Evaluator", id: "SUIIT-EXT-024", time: new Date().toLocaleTimeString(), status: "Success" }
      ];

      const chosen = studentDatabase[Math.floor(Math.random() * studentDatabase.length)];
      setScannedLogs((prev) => [chosen, ...prev]);
      setScanMessage(`Marked Attendance: ${chosen.name}!`);
      setScanning(false);
    }, 2800);
  };

  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Name,Student ID,Timestamp,Status"]
        .concat(scannedLogs.map((log) => `"${log.name}","${log.id}","${log.time}","${log.status}"`))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `biometric_attendance_log_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stopStream = () => {
    setStreamActive(false);
    setScanning(false);
    setScanMessage("Camera stream offline.");
  };

  return (
    <div className="sandbox-card cv-sandbox">
      <div className="cv-camera-feed card-surface">
        {!streamActive ? (
          <div className="camera-offline">
            <i className="bi bi-camera-video-off"></i>
            <button className="btn btn-accent btn-sm" onClick={startScanning}>
              Start Biometric Webcam
            </button>
          </div>
        ) : (
          <div className="camera-online">
            {/* Holographic scanner layout */}
            <div className={`scanner-hud ${scanning ? "scanning" : ""}`}>
              <div className="hud-line"></div>
              <div className="hud-corner top-left"></div>
              <div className="hud-corner top-right"></div>
              <div className="hud-corner bottom-left"></div>
              <div className="hud-corner bottom-right"></div>
              <div className="hud-indicator">{scanMessage}</div>
            </div>
            {/* Visual background simulation */}
            <svg className="biometric-mesh" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="var(--accentColor)" strokeWidth="0.5" fill="none" opacity="0.3" strokeDasharray="3 3"/>
              <path d="M10,50 L90,50 M50,10 L50,90" stroke="var(--accentPink)" strokeWidth="0.2" opacity="0.4"/>
            </svg>
            <div className="camera-controls">
              <button
                className="btn btn-accent btn-xs"
                onClick={startScanning}
                disabled={scanning}
              >
                Scan Next Face
              </button>
              <button className="btn btn-ghost btn-xs text-danger" onClick={stopStream}>
                Stop Camera
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="cv-logs-panel">
        <div className="panel-header-row">
          <h6>Attendance Registers</h6>
          <button className="btn btn-ghost btn-xs" onClick={handleExportCSV}>
            <i className="bi bi-download"></i> Export CSV
          </button>
        </div>
        <div className="cv-logs-list">
          {scannedLogs.map((log, index) => (
            <div key={index} className="cv-log-item">
              <div>
                <strong>{log.name}</strong>
                <span>{log.id}</span>
              </div>
              <div className="text-end">
                <strong>{log.time}</strong>
                <span className="badge bg-success">{log.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. CYBERBULLYING DETECTION SANDBOX
// ==========================================
export function CyberbullyingSandbox() {
  const [comment, setComment] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setAnalyzing(true);

    setTimeout(() => {
      const rawText = comment.toLowerCase();
      // Abusive words dictionary (common English, Hinglish, Hindi abusive strings)
      const abusiveWords = [
        "pagal", "stupid", "idiot", "dumb", "hate", "loser", "jerk", "ugly", 
        "kamina", "saala", "gadha", "maro", "kill yourself", "fool", "worst"
      ];

      const foundAbuse = abusiveWords.filter((word) => rawText.includes(word));
      const hasAbuse = foundAbuse.length > 0;
      const confidence = hasAbuse
        ? Math.min(50 + foundAbuse.length * 15 + Math.floor(Math.random() * 10), 99)
        : Math.max(5 + Math.floor(Math.random() * 15), 1);

      setResult({
        text: comment,
        hasAbuse,
        confidence,
        keywords: foundAbuse,
        class: hasAbuse ? "Bullying / Toxicity Flagged" : "Neutral / Friendly Comment"
      });
      setAnalyzing(false);
    }, 1200);
  };

  return (
    <div className="sandbox-card nlp-sandbox">
      <form onSubmit={handleAnalyze} className="nlp-form">
        <h6>Comment Sentiment Analyzer</h6>
        <p className="nlp-subtitle" style={{ fontSize: "0.82rem", color: "var(--textMuted)", margin: "-6px 0 16px" }}>
          Type any feedback, greeting, or comment (supports Hinglish & English).
        </p>
        <textarea
          rows="3"
          placeholder="E.g., You did a horrible job, idiot. OR Hey, great setup, loved the UI!"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
        <button
          type="submit"
          className="btn btn-accent btn-sm w-100 mt-2"
          disabled={analyzing}
        >
          {analyzing ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Evaluating NLP Model...
            </>
          ) : (
            "Analyze Comment Toxicity"
          )}
        </button>
      </form>

      <div className="nlp-results-panel">
        <h6>Classification Output</h6>
        {result ? (
          <div className={`nlp-result-card card-surface ${result.hasAbuse ? "border-danger" : "border-success"}`}>
            <div className="result-metric">
              <span className="text-uppercase" style={{ fontSize: "0.72rem", color: "var(--textMuted)" }}>
                Detected Toxicity Score
              </span>
              <strong className={result.hasAbuse ? "text-danger" : "text-success"} style={{ fontSize: "1.8rem" }}>
                {result.confidence}%
              </strong>
            </div>
            <div className="result-meter-track">
              <div
                className={`result-meter-fill ${result.hasAbuse ? "bg-danger" : "bg-success"}`}
                style={{ width: `${result.confidence}%` }}
              ></div>
            </div>
            <div className="result-details">
              <strong>{result.class}</strong>
              {result.hasAbuse && result.keywords.length > 0 && (
                <div className="flagged-tokens mt-2">
                  <span>Flagged Keywords:</span>
                  <div className="chip-wrap">
                    {result.keywords.map((kw) => (
                      <span key={kw} className="badge bg-danger-subtle text-danger border border-danger-subtle">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="nlp-placeholder">
            <i className="bi bi-shield-exclamation"></i>
            <p>Input a comment to run classifier matrices.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 7. ANIME RESIZING GRID SANDBOX (AniMetro)
// ==========================================
export function AniMetroSandbox() {
  const [sliderWidth, setSliderWidth] = useState(100); // percentage

  const animeList = [
    { name: "Attack on Titan", type: "Dark Fantasy", episodes: 87, image: "bi-shield-shaded" },
    { name: "Jujutsu Kaisen", type: "Supernatural", episodes: 47, image: "bi-moon-stars" },
    { name: "Demon Slayer", type: "Adventure", episodes: 55, image: "bi-lightning" },
    { name: "Fullmetal Alchemist", type: "Fantasy", episodes: 64, image: "bi-gem" }
  ];

  return (
    <div className="sandbox-card animetro-sandbox">
      <div className="animetro-controls card-surface">
        <div className="control-row">
          <span>Simulation Width: {sliderWidth}%</span>
          <span className="badge bg-ghost">{sliderWidth > 75 ? "Desktop Grid" : sliderWidth > 45 ? "Tablet Column" : "Mobile Flex"}</span>
        </div>
        <input
          type="range"
          min="30"
          max="100"
          value={sliderWidth}
          onChange={(e) => setSliderWidth(parseInt(e.target.value))}
          className="w-100"
        />
      </div>

      <div className="animetro-viewport-wrap">
        <div className="animetro-viewport" style={{ width: `${sliderWidth}%` }}>
          <div className="animetro-grid">
            {animeList.map((anime, index) => (
              <div key={index} className="animetro-card card-surface">
                <i className={`bi ${anime.image}`}></i>
                <div className="animetro-card-body">
                  <h6>{anime.name}</h6>
                  <span>{anime.type}</span>
                  <strong>{anime.episodes} eps</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// CORE SANDBOX MODAL CONTAINER
// ==========================================
export default function ProjectSandboxModal({ activeSandbox, onClose }) {
  if (!activeSandbox) return null;

  const renderActiveSandbox = () => {
    switch (activeSandbox.name) {
      case "Simple Banking Application":
        return <BankingTerminalSandbox />;
      case "Connect Games":
        return <ConnectGamesSandbox />;
      case "Finance Dashboard UI":
        return <FinanceDashboardSandbox />;
      case "E-Commerce Website":
        return <ECommerceSandbox />;
      case "Face Recognition Attendance System":
        return <FaceRecognitionSandbox />;
      case "Cyberbullying Detection in Hinglish":
        return <CyberbullyingSandbox />;
      case "AniMetro.in":
        return <AniMetroSandbox />;
      default:
        return <div className="text-center py-5">Demo simulation sandbox under construction.</div>;
    }
  };

  return (
    <div className="sandbox-overlay-modal" onClick={onClose}>
      <div className="sandbox-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="sandbox-modal-header">
          <div className="header-meta">
            <span className="sandbox-badge">SANDBOX RUNNER</span>
            <h4>{activeSandbox.name}</h4>
          </div>
          <button className="sandbox-close-btn" onClick={onClose} aria-label="Close Sandbox">
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="sandbox-modal-body">
          <div className="sandbox-left-content">
            {renderActiveSandbox()}
          </div>
          <div className="sandbox-right-details">
            <h5>Workspace Details</h5>
            <div className="detail-field">
              <span>Stack / Framework</span>
              <strong>{activeSandbox.stack.join(", ")}</strong>
            </div>
            <div className="detail-field">
              <span>Simulation Mode</span>
              <strong>Interactive Client-Side Engine</strong>
            </div>
            <div className="detail-field mt-3">
              <span>Project Goal</span>
              <p style={{ fontSize: "0.85rem", color: "var(--textMuted)", margin: "4px 0 0", lineHeight: "1.4" }}>
                This is a virtualized deployment. You can test inputs, execute code segments, or trigger logic flows in real-time, exactly representing the behavior of the source repository.
              </p>
            </div>
            <a
              href={activeSandbox.url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-accent btn-sm w-100 mt-auto"
            >
              <i className="bi bi-github"></i> Open Source Repository
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
