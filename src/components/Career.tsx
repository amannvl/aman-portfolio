import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Technical Lead</h4>
                <h5>HCLTech</h5>
              </div>
              <h3>Dec 2024 – Present</h3>
            </div>
            <p>
              Transitioned complete platform from AWS Services to Azure Services, handling all Data APIs written in Golang. Stabilized services in Azure by replicating AWS infrastructure using Helm and Terraform. Handled multiple production support issues involving architectural enhancements. Developed common modules to support multiple cloud services through configuration-driven interfaces.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Consultant 2</h4>
                <h5>Ernst & Young (EY)</h5>
              </div>
              <h3>Dec 2022 – Dec 2024</h3>
            </div>
            <p>
              <b>Orchestration Engine:</b> Built core orchestration engine in Go communicating with Argo server for script execution. Developed Kafka modules with producers and consumers for processing request queues. Designed database abstraction modules to handle database operations efficiently. Implemented ECS modules for unified storage handling via interfaces. Built parser modules to decode raw device data and trigger remediation scripts. Created CI/CD base framework for 19+ modules including Sonar, lint, go-lint, Docker artifact pipelines. Designed foundational architecture for multiple client-facing projects.<br/><br/>
              <b>Telemetry:</b> Developed Go-based telemetry software to record, transmit, and analyze device readings.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Developer</h4>
                <h5>Times Internet Pvt. Ltd.</h5>
              </div>
              <h3>Apr 2021 – Dec 2022</h3>
            </div>
            <p>
              Developed core TRANSCODER engine for processing media across TV channels and 50+ digital products. Ensured application security and API/database interactions throughout media lifecycle. Enhanced and maintained SLIKE CMS with new features and client-specific requirements. Built standalone social media handler enabling direct media uploads to multiple platforms. Collaborated closely with product managers, developers, and QA teams. Optimized data handling using high-performance binary solutions.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Developer - Intern</h4>
                <h5>Makeology Labs, IIT Bombay</h5>
              </div>
              <h3>Aug 2020 – Sep 2020</h3>
            </div>
            <p>
              Developed full-stack applications using Python, Django, and PostgreSQL. Contributed to development of a new e-learning platform. Worked with Bootstrap and modern web frameworks. Deployed applications on AWS and Heroku using EC2, RDS, IAM, and S3.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Developer - Intern</h4>
                <h5>Incred Applications Pvt. Ltd., Noida</h5>
              </div>
              <h3>Apr 2019 – Aug 2019</h3>
            </div>
            <p>
              Developed RESTful APIs using PHP and Zend framework. Built components for DSOBS and Kalakar web applications. Implemented QR code generation and related backend features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
