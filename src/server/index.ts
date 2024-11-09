import express from 'express';
import cors from 'cors';
import { employeeRouter } from './routes/employees';
import { recordRouter } from './routes/records';
import { salaryRouter } from './routes/salaries';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/employees', employeeRouter);
app.use('/api/records', recordRouter);
app.use('/api/salaries', salaryRouter);

// Error handling
app.use(errorHandler);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});