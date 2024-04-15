import { useCallback, useState } from 'react';

const SignInButton = () => {
  const theme = 'light';
  const variant = 'neynar';
  const logoSize = '30px';
  const height = '48px';
  const width = '218px';
  const borderRadius = '10px';
  const fontSize = '16px';
  const fontWeight = '300';
  const padding = '8px 15px';
  const margin = '0px';
  const text = 'hello';
  const color = '';
  const backgroundColor = '';
  const styles = '';
  const customLogoUrl = '';

  const client_id = process.env.NEXT_PUBLIC_NEYNAR_CLIENT_ID;
  const neynar_login_url = 'https://app.neynar.com/login';

  if (!client_id) {
    throw new Error('NEXT_PUBLIC_NEYNAR_CLIENT_ID is not defined in .env');
  }

  const getButton = useCallback(() => {
    return (
      <div
        className="neynar_signin mt-6"
        data-client_id={client_id}
        data-neynar_login_url={neynar_login_url}
        data-success-callback="onSignInSuccess"
        data-theme="light"
        data-variant="neynar"
        data-logo_size={logoSize}
        data-height={height}
        data-width={width}
        data-border_radius={borderRadius}
        data-font_size={fontSize}
        data-font_weight={fontWeight}
        data-padding={padding}
        data-margin={margin}
        data-text={text}
        data-color={color}
        data-background_color={backgroundColor}
        data-styles={styles}
        data-custom_logo_url={customLogoUrl}
      ></div>
    );
  }, [
    theme,
    variant,
    logoSize,
    height,
    width,
    borderRadius,
    fontSize,
    fontWeight,
    padding,
    margin,
    text,
    color,
    backgroundColor,
    styles,
    customLogoUrl,
  ]);

  return <div className="mx-5 flex flex-col items-center justify-center">{getButton()}</div>;
};

export default SignInButton;
