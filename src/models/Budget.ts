class Budget {
  private _name: string;
  private _amount: number;

  constructor(public Name: string, public Amount: number) {
    this._name = Name;
    this._amount = Amount;
  }

  
  get name(): string {
    return this._name;
  }

  
  
}

class Budgets {
  private _budgetArray: Budget[];

  constructor() {
    this._budgetArray = [new Budget("Groceries", 500), new Budget("Home", 300)]
  }

  get BudgetArray(): Budget[] {
    return this._budgetArray
  }
}