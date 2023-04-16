import type { ComponentToken as WaveToken } from "../../_util/wave/style";
import type { ComponentToken as ButtonComponentToken } from '../../button/style';
import type { ComponentToken as EmptyComponentToken } from '../../empty/style';
import type { ComponentToken as SpaceComponentToken } from "../../space/style";
import type { ComponentToken as AppComponentToken} from "../../app/style"

export interface ComponentTokenMap {
  Button?: ButtonComponentToken;
  Empty?: EmptyComponentToken;
  Wave?: WaveToken;
  Space?: SpaceComponentToken;
  App?: AppComponentToken;
}
