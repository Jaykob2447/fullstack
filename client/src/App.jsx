import { Field, Formik, Form, ErrorMessage } from "formik";
import { useEffect } from "react";
import { connect } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
import "./App.css";
import { createPhoneThunk, getPhonesThunk } from "./store/slices/phoneSlice";

function App({
  phones: { phones, isFetching, error },
  getPhones,
  createPhone,
}) {
  // TODO clear or cange init val (its for test) !!!!! and set validate to form
  const initVal = {
    model: "Galaxy S24 Ultra",
    brand: "Samsung",
    year_of_prod: "2024-02-15",
    ram: "16",
    cpu: "Snapdragon 8 Gen 3",
    screen_diagonal: "6.8",
    have_nfc: "Yes",
  };
  const heandelSubmit = (value, formibBag) => {
    createPhone(value);
    formibBag.resetForm();
  };

  useEffect(() => {
    getPhones();
  }, []);

  return (
    <>
      <Formik initialValues={initVal} onSubmit={heandelSubmit}>
        <Form>
          <label>
            <span>Model</span>
            <div>
              <Field
                type="text"
                name="model"
                placeholder="Model phone"
                autoFocus
              />
              <ErrorMessage name="model" component="span" />
            </div>
          </label>
          <label>
            <span>Brand</span>
            <div>
              <Field type="text" name="brand" placeholder="Brand name" />
              <ErrorMessage name="brand" component="span" />
            </div>
          </label>
          <label>
            <span>Cpu</span>
            <div>
              <Field type="text" name="cpu" placeholder="Cpu name" />
              <ErrorMessage name="cpu" component="span" />
            </div>
          </label>
          <label>
            <span>Ram</span>
            <div>
              <Field type="number" name="ram" placeholder="Ram" />
              <ErrorMessage name="ram" component="span" />
            </div>
          </label>
          <label>
            <span>Year</span>
            <div>
              <Field
                type="date"
                name="year_of_prod"
                placeholder="Year of production"
              />
              <ErrorMessage name="year_of_prod" component="span" />
            </div>
          </label>
          <label>
            <span>Have NFC?</span>
            <div>
              <Field type="text" name="have_nfc" placeholder="Yes or No" />
              <ErrorMessage name="have_nfc" component="span" />
            </div>
          </label>
          <label>
            <span>screen_diagonal</span>
            <div>
              <Field
                type="number"
                step={0.1}
                name="screen_diagonal"
                placeholder="Screen diagonal"
              />
              <ErrorMessage name="screen_diagonal" component="span" />
            </div>
          </label>
          <button type="submit">Enter</button>
          <button type="reset">Reset</button>
        </Form>
      </Formik>
      <BeatLoader loading={isFetching} />
      {error && <div>ERROR!</div>}
      <ul className="phones_list">
        {phones.map((p) => (
          <li key={p.id}>
            <p>brand: {p.brand}</p>
            <p>cpu: {p.cpu}</p>
            <p>NFC: {p.have_nfc}</p>
            <p>ram: {p.ram}</p>
            <p>screen diagonal: {p.screen_diagonal}</p>
            <p>year of prod: {p.year_of_prod}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  getPhones: () => dispatch(getPhonesThunk()),
  createPhone: (val) => dispatch(createPhoneThunk(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
