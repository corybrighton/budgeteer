import DebtData from "@/models/DebtData"
import { Module } from "vuex"
import { RootState } from "../types"
import { getters } from './getters';

const state: DebtData[] = [{
        name: "Chase", 
        amount: 3500, 
        minimumPayment: 350, 
        interest: 13, 
        introRate: 0, 
        introLength: 0, 
        payoffOrder: 0, 
        drawOnGraph: true
      },
      {
        name: "Home Depot Card", 
        amount: 3221.92, 
        minimumPayment: 125, 
        interest: 0, 
        introRate: 0, 
        introLength: 0, 
        payoffOrder: 1, 
        drawOnGraph: true
      },
      {
        name: "Student Loans", 
        amount: 14634.82, 
        minimumPayment: 105.3, 
        interest: 2, 
        introRate: 0, 
        introLength: 0, 
        payoffOrder: 2, 
        drawOnGraph: true
      },
      {
        name: "RC Willy", 
        amount: 2066.35, 
        minimumPayment: 104, 
        interest: 0, 
        introRate: 0, 
        introLength: 0, 
        payoffOrder: 3, 
        drawOnGraph: true
      },
      {
        name: "Firstmark Service", 
        amount: 13156.67, 
        minimumPayment: 172.25, 
        interest: 5.74, 
        introRate: 0, 
        introLength: 0, 
        payoffOrder: 4, 
        drawOnGraph: true
      },
      {
        name: "FedLoan", 
        amount: 50810.27, 
        minimumPayment: 108.65, 
        interest: 6.8, 
        introRate: 0, 
        introLength: 0, 
        payoffOrder: 7, 
        drawOnGraph: true
      },
      {
        name: "Ford Explorer", 
        amount: 10340.99, 
        minimumPayment: 277.00, 
        interest: 3.99, 
        introRate: 0, 
        introLength: 0, 
        payoffOrder: 6, 
        drawOnGraph: true
      },
      {
        name: "SunTrust", 
        amount: 221357.61, 
        minimumPayment: 1439.47, 
        interest: 3.75, 
        introRate: 0, 
        introLength: 0, 
        payoffOrder: 5, 
        drawOnGraph: false
      }]

export const DebtState: Module<DebtData[], RootState> = {
  state,
  getters,
}