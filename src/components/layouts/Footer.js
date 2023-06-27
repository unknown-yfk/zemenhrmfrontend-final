import { Col, Layout, Row } from "antd";
import styles from "./Footer.module.css";
import {  useTranslation } from "react-i18next";


function Footer() {
	const {t} = useTranslation();

  const { Footer: AntFooter } = Layout;
  const year = new Date().getFullYear();

  return (
    <AntFooter className={styles.footer}>
      <Row>
        <Col xs={24} md={24} lg={12} className={styles.copyrightCol}>
          <p className={styles.copyrightText}>
            {year}{" "}
            <a
              href="https://software.andnetdigital.com/"
              className="font-weight-bold"
              target="_blank"
              rel="noreferrer"
            >
               &copy;
               {t('andinet')}
            </a>{" "}
           
          </p>
        </Col>
        <Col xs={24} md={24} lg={12}>
          <div className={styles.footerMenu}>
            <ul className={styles.footerList}>
              <li className="nav-item">
                <a
                  href="https://software.andnetdigital.com/"
                  className="nav-link text-muted"
                  target="/"
                >
                  {/* Andinet */}
                  {t('andinet')}
                </a>
              </li>
              <li className="nav-item">
                <a href="https://software.andnetdigital.com/about/" className="nav-link text-muted" target="/">
                  {/* About Us */}
                  {t('about_us')}

                </a>
              </li>
              <li className="nav-item">
                <a
                  href="https://software.andnetdigital.com/blog/"
                  className="nav-link text-muted"
                  target="_blank"
                >
                  {/* Blog */}
                  {t('blog')}

                </a>
              </li>
             
            </ul>
          </div>
        </Col>
      </Row>
    </AntFooter>
  );
}

export default Footer;
