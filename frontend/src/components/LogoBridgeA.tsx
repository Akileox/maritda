interface LogoBridgeAProps {
  className?: string;
  size?: number;
}

const LogoBridgeA = ({ className = '', size = 40 }: LogoBridgeAProps) => (
  <svg
    className={`text-blue-600 ${className}`}
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16 16C16 11.5817 19.5817 8 24 8H27C31.4183 8 35 11.5817 35 16V24C35 28.4183 31.4183 32 27 32H20.4142C19.6332 32 18.8826 31.6839 18.317 31.1183L13.1183 25.9196C12.3451 25.1464 12.4013 23.8732 13.2301 23.1818L16 20.75V16Z" stroke="currentColor" strokeWidth="3" />
    <path d="M48 48C48 52.4183 44.4183 56 40 56H37C32.5817 56 29 52.4183 29 48V40C29 35.5817 32.5817 32 37 32H43.5858C44.3668 32 45.1174 32.3161 45.683 32.8817L50.8817 38.0804C51.6549 38.8536 51.5987 40.1268 50.7699 40.8182L48 43.25V48Z" stroke="currentColor" strokeWidth="3"/>
    <path d="M35 24H29" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

export default LogoBridgeA; 