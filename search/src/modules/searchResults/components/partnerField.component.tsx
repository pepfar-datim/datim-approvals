import React from 'react';

export function PartnerField({partnerName}:{partnerName:string}) {
    if (partnerName.length>65&&/[A-Z, ]/.test(partnerName)) return <span style={{}}>{partnerName.slice(0,50).trim()}...</span>
    return <>{partnerName}</>
}