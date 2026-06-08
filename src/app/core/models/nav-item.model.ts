export interface NavItem {
  labelKey: string;
  route?: string;
  fragment?: string;
  children?: NavItem[];
}
