import {fireEvent, screen} from "@testing-library/react";
import {expect} from "vitest";
import {renderSearch} from "./utils/renderSearch.tsx";
import {meGlobalUrls, mePartnerUrls} from "./utils/fetchUrls.const.ts";
import {systemUrls} from '@approvals/service'

const globalUserUrls = {
    ...systemUrls,
    ...meGlobalUrls,
}

const partnerUserUrls = {
    ...systemUrls,
    ...mePartnerUrls,
}

function checkSelectedValue(selectName:string, value: string):void {
    const ou = screen.getByTestId(`select ${selectName}`)
    expect(ou.textContent).toBe(value)
}

function checkOptionsExist(selectName:string, options: string[]):void {
    fireEvent.mouseDown(screen.getByTestId(`select ${selectName}`).children[0])
    options.forEach((option:string)=>screen.getByText(option))
}

function checkOptionsDontExist(selectName:string, options: string[]):void {
    fireEvent.mouseDown(screen.getByTestId(`select ${selectName}`).children[0])
    options.forEach((option:string)=>expect(screen.queryByText(option)).toBeFalsy())
}

test(`1 > Menu Options > 🌎 Global OU should be pre-selected for 🧐 SuperUser `, async ()=>{
    await renderSearch(globalUserUrls)
    checkSelectedValue('Operating Unit', 'Global')
})

test(`1 > Menu Options > 📍 Angola should be pre-selected for 👨‍ Partner`, async ()=>{
    await renderSearch(partnerUserUrls)
    checkSelectedValue('Operating Unit', 'Angola')
})

test(`1 > Menu Options > 🧐 SuperUser should see 🌎 ALL OUs`, async ()=>{
    await renderSearch(globalUserUrls)
    checkOptionsExist('Operating Unit',['Angola','Asia Region'])
})

test(`1 > Menu Options > 👨 Partner should not see 📍 Other OUs`, async ()=>{
    await renderSearch(partnerUserUrls)
    checkOptionsDontExist('Operating Unit',['Asia Region'])
})

test(`1 > Menu Options > Correct Period 📆 should be pre-selected`, async ()=>{
    await renderSearch(partnerUserUrls)

    /* Latest period from HRH should be selected*/
    checkSelectedValue('Workflow','HRH FYOct')
    checkSelectedValue('Period','October 2022 - September 2023')

    /* Latest period from MER Results should be selected */
    fireEvent.mouseDown(screen.getByTestId('select Workflow').children[0])
    fireEvent.click(screen.getByText('MER Results'))
    checkSelectedValue('Period','Jul - Sep 2023')
})

test(`1 > Menu Options > 🧐 SuperUser should see expired 📆 Periods`, async ()=>{
    await renderSearch(globalUserUrls)
    checkOptionsExist('Period',['October 2021 - September 2022 (closed)'])
})

test(`1 > Menu Options > 👨 Partner should not see expired 📆 Periods`, async ()=>{
    await renderSearch(partnerUserUrls)
    checkOptionsDontExist('Period',['October 2021 - September 2022 (closed)'])
})