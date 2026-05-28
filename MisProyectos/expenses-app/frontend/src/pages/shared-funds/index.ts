export interface SharedFund {
  id: number;
  year: number;
  month: number;
  targetAmount: string;
  createdAt: string;
}

export interface SharedFundBreakdownMember {
  userId: string;
  userName: string;
  salary: number;
  percentage: number;
  expectedContribution: number;
}

export interface SharedFundBreakdown {
  year: number;
  month: number;
  targetAmount: number;
  totalSalaries: number;
  members: SharedFundBreakdownMember[];
}