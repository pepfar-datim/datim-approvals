import React from 'react';
import {Table, TableBody, TableCell, TableRow} from "@material-ui/core";

export default function WorkflowOverview({workflow, period}: {workflow:string, period:string}) {
    return <Table size="small">
      <TableBody>
          <TableRow>
              <TableCell>Workflow</TableCell>
              <TableCell>{workflow}</TableCell>
          </TableRow>
          <TableRow>
              <TableCell>Period</TableCell>
              <TableCell>{period}</TableCell>
          </TableRow>
      </TableBody>
    </Table>;
}