export interface NavItem {
  labelKey: string;
  route?: string;
  fragment?: string;
  externalUrl?: string;
  openInNewTab?: boolean;
  children?: NavItem[];
}
