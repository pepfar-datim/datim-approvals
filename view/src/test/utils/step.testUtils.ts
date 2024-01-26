
export type StepData = {
    stepNr:number;
    title: string;
    completed: boolean;
}

export function getStepData(stepNr:number):StepData{
    const element:HTMLElement = document.querySelector(`.MuiStep-root:nth-child(${stepNr})`)
    const previous:HTMLElement = element.previousElementSibling as HTMLElement
    const completed = !previous || previous.classList.contains('Mui-completed')
    return {
        stepNr: stepNr,
        title: element.querySelector('.MuiStepLabel-labelContainer').textContent,
        completed
    }
}