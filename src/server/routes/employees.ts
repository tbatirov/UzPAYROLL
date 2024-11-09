import { Router } from 'express';
import { z } from 'zod';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

// Validation schemas
const paidLeavesSchema = z.object({
  marriage: z.number().min(0),
  bereavement: z.number().min(0),
  paternity: z.number().min(0),
  maternity: z.number().min(0),
  study: z.number().min(0),
  military: z.number().min(0),
});

const agreementSchema = z.object({
  vacationDaysPerYear: z.number().min(0),
  sickLeavePerYear: z.number().min(0),
  overtimeRate: z.number().min(1),
  paidLeaves: paidLeavesSchema,
});

const employeeSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    position: z.string().min(2),
    pinfl: z.string().length(14).regex(/^\d+$/),
    passportSeries: z.string().length(2).regex(/^[A-Z]+$/),
    passportNumber: z.string().length(7).regex(/^\d+$/),
    dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    paymentType: z.enum(['salary', 'hourly']),
    paymentFrequency: z.enum(['monthly', 'bimonthly']),
    rate: z.number().min(0),
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    taxRate: z.number().min(0).max(100),
    agreement: agreementSchema,
  })
});

// GET all employees
router.get('/', async (req, res, next) => {
  try {
    // TODO: Implement database query
    res.json({ employees: [] });
  } catch (error) {
    next(error);
  }
});

// GET employee by ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    // TODO: Implement database query
    res.json({ employee: null });
  } catch (error) {
    next(error);
  }
});

// POST create new employee
router.post('/', validateRequest(employeeSchema), async (req, res, next) => {
  try {
    // TODO: Implement database insert
    res.status(201).json({ 
      id: 'generated-id',
      ...req.body 
    });
  } catch (error) {
    next(error);
  }
});

// PUT update employee
router.put('/:id', validateRequest(employeeSchema), async (req, res, next) => {
  try {
    const { id } = req.params;
    // TODO: Implement database update
    res.json({ 
      id,
      ...req.body 
    });
  } catch (error) {
    next(error);
  }
});

// DELETE employee
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    // TODO: Implement database delete
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export const employeeRouter = router;