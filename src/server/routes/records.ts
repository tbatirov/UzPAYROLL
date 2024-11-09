import { Router } from 'express';
import { z } from 'zod';

const router = Router();

// Validation schemas
const taxSchema = z.object({
  incomeTax: z.number().min(0),
  socialTax: z.number().min(0),
  inpsTax: z.number().min(0)
});

const baseRecordSchema = z.object({
  employeeId: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  description: z.string(),
  taxes: taxSchema.optional()
});

const leaveRecordSchema = baseRecordSchema.extend({
  type: z.literal('leave'),
  leaveType: z.enum([
    'vacation',
    'sick',
    'marriage',
    'bereavement',
    'paternity',
    'maternity',
    'study',
    'military',
    'unpaid'
  ]),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  days: z.number().min(1),
  isPaid: z.boolean(),
  amount: z.number().optional()
});

const overtimeRecordSchema = baseRecordSchema.extend({
  type: z.literal('overtime'),
  amount: z.number().min(0)
});

const bonusRecordSchema = baseRecordSchema.extend({
  type: z.literal('bonus'),
  amount: z.number().min(0)
});

const deductionRecordSchema = baseRecordSchema.extend({
  type: z.literal('deduction'),
  amount: z.number().min(0)
});

const recordSchema = z.discriminatedUnion('type', [
  leaveRecordSchema,
  overtimeRecordSchema,
  bonusRecordSchema,
  deductionRecordSchema,
]);

// GET all records for an employee
router.get('/employee/:employeeId', (req, res) => {
  const { employeeId } = req.params;
  // TODO: Implement database query
  res.json({ records: [] });
});

// GET records by type
router.get('/type/:type', (req, res) => {
  const { type } = req.params;
  // TODO: Implement database query
  res.json({ records: [] });
});

// POST create new record
router.post('/', async (req, res) => {
  try {
    const record = recordSchema.parse(req.body);
    // TODO: Implement database insert
    res.status(201).json({ 
      id: 'generated-id',
      ...record 
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// PUT update record
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const record = recordSchema.parse(req.body);
    // TODO: Implement database update
    res.json({ 
      id,
      ...record 
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// DELETE record
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  // TODO: Implement database delete
  res.status(204).send();
});

export const recordRouter = router;