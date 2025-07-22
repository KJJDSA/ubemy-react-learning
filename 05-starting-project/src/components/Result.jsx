import React from 'react'
import {calculateInvestmentResults, formatter} from "../util/investment"

const Result = ({data}) => {
  
const analDatas=calculateInvestmentResults(data)
const initialInvestment = 
analDatas[0].valueEndOfYear -
analDatas[0].interest - 
analDatas[0].annualInvestment

return (
  <table id="result">
    <thead>
      <tr>
        <th>Year</th>
        <th>Investment Value</th>{/* 투자금액 */}
        <th>Interest(Year)</th>{/* 이자(한 해) */}
        <th>Total Interest</th>{/* 총 이자(지금까지 매년 발생한 이자 총합) */}
        <th>Invested Capital</th>{/* 투자 총액(이자 */}
      </tr>
    </thead>
    <tbody>
      {analDatas.map((analData, index) => {
      const totlaInterest = 
      analData.valueEndOfYear/* 연말 투자 가치 */ - 
      analData.annualInvestment/* 올해 추가 투자 금액 */ * analData.year - 
      initialInvestment;
      const totalAmountInvested = analData.valueEndOfYear - totlaInterest


        return ( // 함수에 집어넣긴 했는데 어떻게 출력하는지 모르겠음(영어이슈;)
          <tr key={index+analData.annualInvestment}>
            <td>{analData.year}</td>
            <td>{formatter.format(analData.valueEndOfYear)}</td>
            <td>{formatter.format(analData.interest)}</td>
            <td>{formatter.format(totlaInterest)}</td>
            <td>{formatter.format(totalAmountInvested)}</td>
          </tr>
        )
      })}
    </tbody>
  </table>
)
}

export default Result
