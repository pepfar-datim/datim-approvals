export default function  getStatus(workflowType:string, level:string, accepted:boolean){
    if (!level) return 'pending at partner';
    console.log(level)
    if (level==='5' && !accepted)  return 'submitted by partner';
    if (level==='5' && accepted)  return 'accepted by agency';
    if (level==='4' && !accepted)  return 'submitted by agency';
    if (level==='4' && accepted && workflowType==='MER')  return 'accepted by inter-agency';
    if (level==='4' && accepted && workflowType==='ER')  return 'accepted by gobal agency';
    if (level==='3' && !accepted && workflowType==='MER')  return 'submitted by inter-agency';
    if (level==='2' && !accepted && workflowType==='ER')  return 'submitted by gobal agency';
    if (level==='2' && accepted && workflowType==='ER')  return 'accepted by global';
    if (level==='3' && accepted)  return 'accepted by global';
    if (level==='1' && !accepted)  return 'submitted by global';
    return `${level} / ${accepted}`;
}