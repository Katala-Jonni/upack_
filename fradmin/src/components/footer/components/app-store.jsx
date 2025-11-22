import Box from "@mui/material/Box"; // GLOBAL CUSTOM COMPONENT

import FlexBox from "../../flex-box/flex-box"; // CUSTOM ICON COMPONENTS

import { PLAY_APP_STORE_DATA, MAIN_BUNNER__DATA } from "../data";
export default function AppStore(props) {
  return <FlexBox flexWrap="wrap" m={-1}>
     <a href={props.url} key={props.id} target="_blank" rel="noreferrer noopener">
          <Box m={1} gap={1} p="10px 16px" color="white" display="flex" bgcolor="#2B3445" borderRadius="5px" alignItems="center">
            <div>
              <Box fontSize="14px" fontWeight="700">
                ПОДРОБНЕЕ
              </Box>
            </div>
          </Box>
        </a>
    </FlexBox>;
}


// {MAIN_BUNNER__DATA.map(({
//                           icon: Icon,
//                           subtitle,
//                           title,
//                           url
//                         }) => <a href={props.url} key={props.id} target="_blank" rel="noreferrer noopener">
//   <Box m={1} gap={1} p="10px 16px" color="white" display="flex" bgcolor="#161d2b" borderRadius="5px" alignItems="center">
//     {/*<Icon />*/}
//
//     <div>
//       {/*<Box fontSize="8px" fontWeight="600" lineHeight="1">*/}
//       {/*  ПОДРОБНЕЕ*/}
//       {/*</Box>*/}
//
//       <Box fontSize="14px" fontWeight="700">
//         ПОДРОБНЕЕ
//       </Box>
//     </div>
//   </Box>
// </a>)}
// </FlexBox>;
