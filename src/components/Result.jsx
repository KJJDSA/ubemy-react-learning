import React from 'react'
import {calculateInvestmentResults, formatter} from "../util/investment"

const Result = ({data}) => {
  
  const analDatas=calculateInvestmentResults(data)
  return (
    <table id="result">
      <thead>
        <tr>
          <td>Year</td>
          <td>Investment Value</td>
          <td>Interest(Year)</td>
          <td>Total Interest</td>
          <td>Invested Capital</td>
        </tr>
      </thead>
      <tbody>
        {analDatas.map((analData, index) => ( // 함수에 집어넣긴 했는데 어떻게 출력하는지 모르겠음(영어이슈;)
          <tr key={index}>
            <td>{analData.year}</td>
            <td>{formatter.format(analData.annualInvestment)}</td>
            <td>{analData.interest}</td>
            <td>{analData.valueEndOfYear}</td>
            <td>{"?"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Result
