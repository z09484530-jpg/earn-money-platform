import { useMemo, useState } from 'react'

const stats = [
  { label: 'Users', value: '120K+' },
  { label: 'Paid out', value: '$2.5M+' },
  { label: 'Support', value: '24/7' },
  { label: 'Rating', value: '4.9/5' },
]

const initialTasks = [
  { id: 1, title: 'Complete survey', payout: 18, time: '5 min', badge: 'Popular' },
  { id: 2, title: 'Watch product demo', payout: 12, time: '7 min', badge: 'New' },
  { id: 3, title: 'Refer a friend', payout: 25, time: '10 min', badge: 'Bonus' },
  { id: 4, title: 'App review', payout: 20, time: '8 min', badge: 'Top' },
]

const payouts = ['PayPal', 'Bank card', 'Crypto', 'Mobile wallet']

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [balance, setBalance] = useState(1284.5)
  const [withdrawn, setWithdrawn] = useState(640)

  const totalEarnings = useMemo(
    () => tasks.reduce((sum, task) => sum + task.payout, 0),
    [tasks],
  )

  const completeTask = (id) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, payout: task.payout + 4, badge: 'Done' } : task,
      ),
    )
    setBalance((current) => Number((current + 4).toFixed(2)))
  }

  const payoutNow = () => {
    setWithdrawn((current) => Number((current + 25).toFixed(2)))
    setBalance((current) => Number((current - 25).toFixed(2)))
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container nav">
          <div className="brand">
            <div className="brand-mark">T</div>
            <span>TaskEarn Pro</span>
          </div>

          <nav className="nav-links">
            <a href="#features">Features</a>
            <a href="#tasks">Tasks</a>
            <a href="#earnings">Earnings</a>
            <a href="#reviews">Reviews</a>
          </nav>

          <div className="nav-actions">
            <button className="btn btn-light">Log in</button>
            <button className="btn btn-primary">Start earning</button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="badge">Trusted by 120K+ users</span>
              <h1>Earn online with simple daily tasks.</h1>
              <p>
                Complete surveys, invite friends, review apps, and turn your free time
                into a steady online income.
              </p>

              <div className="cta-row">
                <button className="btn btn-primary">Get started</button>
                <button className="btn btn-light">Watch demo</button>
              </div>

              <div className="stat-row">
                {stats.map((item) => (
                  <div key={item.label} className="mini-stat">
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-visual">
              <div className="dashboard-card">
                <div className="card-head">
                  <span className="online-dot" />
                  <span>Earnings dashboard</span>
                </div>

                <div className="balance-box">
                  <span>Total balance</span>
                  <strong>${balance.toFixed(2)}</strong>
                  <small>+ $52.40 today</small>
                </div>

                <div className="task-mini-list">
                  {tasks.slice(0, 3).map((task) => (
                    <div key={task.id} className="mini-task-item">
                      <div>
                        <strong>{task.title}</strong>
                        <span>{task.time}</span>
                      </div>
                      <em>${task.payout}</em>
                    </div>
                  ))}
                </div>

                <button className="wallet-btn" onClick={payoutNow}>Withdraw now</button>
              </div>

              <div className="floating-card card-one">
                <span>Daily bonus</span>
                <strong>+$10</strong>
              </div>

              <div className="floating-card card-two">
                <span>Referrals</span>
                <strong>+24</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <div className="container trust-grid">
            <div>
              <strong>98%</strong>
              <span>Task approval</span>
            </div>
            <div>
              <strong>3 min</strong>
              <span>Avg. payout</span>
            </div>
            <div>
              <strong>Global</strong>
              <span>Available</span>
            </div>
            <div>
              <strong>Secure</strong>
              <span>Verified</span>
            </div>
          </div>
        </section>

        <section id="features" className="section dark-section">
          <div className="container">
            <div className="section-head">
              <span className="badge secondary">Why us</span>
              <h2>Earn with a platform designed for speed and trust</h2>
            </div>

            <div className="feature-grid">
              <article className="info-card">
                <div className="icon">⚡</div>
                <h3>Fast payouts</h3>
                <p>Quick withdrawals to digital wallets and bank cards with clear tracking.</p>
              </article>
              <article className="info-card">
                <div className="icon">🔒</div>
                <h3>Secure access</h3>
                <p>Protected account flow and transparent payment history for every user.</p>
              </article>
              <article className="info-card">
                <div className="icon">📱</div>
                <h3>Mobile friendly</h3>
                <p>Everything works smoothly from desktop, tablet, and mobile devices.</p>
              </article>
              <article className="info-card">
                <div className="icon">👥</div>
                <h3>Referral boost</h3>
                <p>Earn more by inviting friends and growing your team rewards.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="tasks" className="section">
          <div className="container tasks-layout">
            <div className="section-head left">
              <span className="badge secondary">Task board</span>
              <h2>Pick tasks and start earning today</h2>
            </div>

            <div className="tasks-grid">
              {tasks.map((task) => (
                <div key={task.id} className="task-card">
                  <div className="task-top">
                    <span className="tiny-badge">{task.badge}</span>
                    <span className="task-time">{task.time}</span>
                  </div>
                  <h3>{task.title}</h3>
                  <div className="task-bottom">
                    <strong>${task.payout}</strong>
                    <button className="mini-btn" onClick={() => completeTask(task.id)}>
                      Complete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="earnings" className="section dark-section">
          <div className="container earnings-layout">
            <div className="earnings-copy">
              <span className="badge secondary">Earnings</span>
              <h2>Track every payout and referral reward</h2>
              <p>
                Your balance updates instantly, and you can manage your reward flow from
                one clean dashboard.
              </p>
            </div>

            <div className="wallet-panel">
              <div className="wallet-header">
                <span>Current balance</span>
                <strong>${balance.toFixed(2)}</strong>
              </div>

              <div className="summary-boxes">
                <div>
                  <span>Net earnings</span>
                  <strong>${totalEarnings.toFixed(2)}</strong>
                </div>
                <div>
                  <span>Withdrawn</span>
                  <strong>${withdrawn.toFixed(2)}</strong>
                </div>
              </div>

              <div className="payment-list">
                {payouts.map((item) => (
                  <span key={item} className="payment-pill">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="reviews" className="section">
          <div className="container">
            <div className="section-head">
              <span className="badge secondary">Reviews</span>
              <h2>People use it for flexible online income</h2>
            </div>

            <div className="reviews-grid">
              <article className="review-card">
                <div className="stars">★★★★★</div>
                <p>“Very simple interface and the tasks are easy to complete. I earn every week.”</p>
                <div className="reviewer">
                  <strong>Anna M.</strong>
                  <span>Student</span>
                </div>
              </article>
              <article className="review-card">
                <div className="stars">★★★★★</div>
                <p>“The referral program gave me a good extra income boost in just two weeks.”</p>
                <div className="reviewer">
                  <strong>Daniel K.</strong>
                  <span>Freelancer</span>
                </div>
              </article>
              <article className="review-card">
                <div className="stars">★★★★★</div>
                <p>“Clean dashboard and quick payouts. I use it in my free time without stress.”</p>
                <div className="reviewer">
                  <strong>Sara L.</strong>
                  <span>Remote worker</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section cta-section">
          <div className="container cta-box">
            <div>
              <span className="badge secondary">Start today</span>
              <h2>Build your income stream in just a few steps</h2>
            </div>

            <div className="cta-form">
              <input type="email" placeholder="Enter your email" />
              <button className="btn btn-primary">Join now</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-row">
          <div className="brand footer-brand">
            <div className="brand-mark">T</div>
            <span>TaskEarn Pro</span>
          </div>

          <div className="footer-links">
            <a href="#features">Features</a>
            <a href="#tasks">Tasks</a>
            <a href="#reviews">Reviews</a>
          </div>

          <p>© 2026 TaskEarn Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
