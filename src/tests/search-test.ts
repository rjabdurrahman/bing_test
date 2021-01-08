import { browser } from "protractor";
import { readData, writeResult } from "../lib/excel";
import ResultRow from "../Models/ResultRow";
import landingPage from "../pages/LandingPage";
import resultPage from "../pages/ResultPage";
import retest from "./retest";
browser.waitForAngularEnabled(false);

describe("Bing Search", function () {
  let result: any = [];
  readData().forEach((test: any, testNo: any) => {
    it(`Checking Tabs for Keyword - ${test["Data"]}`, async function () {
      landingPage.get();
      let keyword = test["Data"];
      landingPage.search(keyword);
      resultPage.clickAndGetResult().then((btnsAndTexts: any) => {
        for (let i = 0; i < btnsAndTexts.length; i += 2) {
          let res = btnsAndTexts[i + 1]
            .flat()
            .every((x: any) => x.toLowerCase().includes(keyword.toLowerCase()))
            ? "PASS"
            : "FAIL";
          if (i == 0)
            result.push(
              new ResultRow(
                "TC 1",
                keyword,
                `${testNo + 1}.${i / 2 + 1}`,
                btnsAndTexts[i],
                res,
                ""
              )
            );
          else
            result.push(
              new ResultRow(
                "",
                "",
                `${testNo + 1}.${i / 2 + 1}`,
                btnsAndTexts[i],
                res,
                ""
              )
            );
        }
        let failedRows = result.filter((item, index) => {
          item["failedInfo"] = {
            failedBtnNo: parseInt(item["No"].split(".")[1]),
            rowNo: index,
          };
          return (
            item["Result"] == "FAIL" &&
            parseInt(item["No"].split(".")[0]) == testNo + 1
          );
        });
        if (failedRows) {
          retest(keyword, failedRows).then((res) => {
            if (res) {
              for (let i = 0; i < res.length; i += 2) {
                let rerunRes = res[i + 1].every((r) =>
                  r.toLowerCase().includes(res[i].keyword.toLowerCase())
                )
                  ? "PASS"
                  : "FAIL";
                console.log(res[i].rowNo, rerunRes);
                result[res[i].rowNo]["Rerun"] = rerunRes;
              }
              result.forEach((r) => delete r.failedInfo);
              writeResult("Result.xlsx", result);
            }
          });
        }
      });
    });
  });
});