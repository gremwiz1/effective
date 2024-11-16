import { Request, Response } from 'express';
import ActionHistory from '../models/actionHistory';

export const recordAction = async (req: Request, res: Response) => {
  try {
    const action = await ActionHistory.create(req.body);
    res.status(201).json(action);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getActionHistory = async (req: Request, res: Response) => {
  const { shop_id, plu, date_from, date_to, action, page = 1, limit = 10 } = req.query;

  try {
    const filterOptions: any = {
      where: {}
    };

    // Фильтр по shop_id
    if (shop_id) {
      filterOptions.where.shop_id = shop_id;
    }

    // Фильтр по артикулу товара (plu)
    if (plu) {
      filterOptions.where.plu = plu;
    }

    // Фильтр по типу действия
    if (action) {
      filterOptions.where.action = action;
    }

    // Фильтр по дате
    if (date_from || date_to) {
      filterOptions.where.date = {};
      if (date_from) filterOptions.where.date.$gte = new Date(date_from as string);
      if (date_to) filterOptions.where.date.$lte = new Date(date_to as string);
    }

    // Пагинация
    const offset = (Number(page) - 1) * Number(limit);
    filterOptions.offset = offset;
    filterOptions.limit = Number(limit);

    const actions = await ActionHistory.findAndCountAll(filterOptions);
    res.status(200).json({
      total: actions.count,
      pages: Math.ceil(actions.count / Number(limit)),
      currentPage: Number(page),
      data: actions.rows
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
