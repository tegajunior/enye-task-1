<template>
  <div>
    <div class="container" v-if="updatedRecords">
      <div class="row justify-content-between align-items-center">
        <div class="cols-sm-12 col-lg-4">
          <div class="card bg-light mb-4 mt-4 d-flex justify-content-between ">
            <div class="card-body text-center">
              <div class="input-group input-group-lg">
                <input
                  type="text"
                  placeholder="Search Records"
                  class="form-control"
                  v-model.trim="searchQuery"
                  ref="searchQuery"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-sm btn-outline-info"
                    title="Reset Search"
                    @click="resetQuery"
                  >
                    <font-awesome-icon icon="undo"></font-awesome-icon>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-lg-6">
          <form class="p-4" style="background-color: #F8F9FA;">
            <div class="row justify-content-center">
              <div class="col-sm-12 col-md-2 text-primary h3">Filter</div>
              <div class="col-sm-12 col-md-5">
                <select
                  name="sel-gender"
                  id=""
                  class="form-control mt-4 mt-md-0"
                  v-model="mygender"
                >
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Prefer to skip">Prefer to Skip</option>
                </select>
              </div>
              <div class="col-sm-12 col-md-5">
                <select
                  name="sel-payment"
                  id=""
                  class="form-control my-4 my-md-0"
                  v-model="mypaymentMethod"
                >
                  <option value="">Payment Method</option>
                  <option value="paypal">PayPal</option>
                  <option value="cc">CC</option>
                  <option value="money order">Money Order</option>
                  <option value="check">Check</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="card mt-3 mt-md-3">
        <div class="card-header">
          <span class="h3">
            Showing
            {{ startingIndex + 1 }} -
            {{
              recordsPerPage == 20 || recordsPerPage == records.length
                ? recordsPerPage
                : recordsPerPage
            }}
            of {{ records.length }} Records
          </span>
          <span>
            <router-link class="btn btn-primary float-right" to="/">
              Home
            </router-link>
          </span>
        </div>
        <table class="table table-responsive table-striped table-bordered">
          <thead class="thead-dark">
            <tr
              class="table-danger font-weight-bold text-white animate__animated animate__slideInLeft"
            >
              <td>#</td>
              <td>First Name</td>
              <td>Last Name</td>
              <td>Gender</td>
              <td>Latitude</td>
              <td>Longitude</td>
              <td>Credit Card Number</td>
              <td>Credit Card Type</td>
              <td>Email</td>
              <td>Domain Name</td>
              <td>Phone Number</td>
              <td>Mac Address</td>
              <td>URL</td>
              <td>UserName</td>
              <td>Last Login</td>
              <td>Payment Method</td>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(record, index) in updatedRecords"
              :key="record.UserName"
            >
              <td>{{ index + 1 + (startingIndex / 20) * 20 }}</td>
              <td>{{ record.FirstName }}</td>
              <td>{{ record.LastName }}</td>
              <td>{{ record.Gender }}</td>
              <td>{{ record.Latitude }}</td>
              <td>{{ record.Longitude }}</td>
              <td>{{ record.CreditCardNumber }}</td>
              <td>{{ record.CreditCardType }}</td>
              <td>{{ record.Email }}</td>
              <td>{{ record.DomainName }}</td>
              <td>{{ record.PhoneNumber }}</td>
              <td>{{ record.MacAddress }}</td>
              <td>{{ record.URL }}</td>
              <td>{{ record.UserName }}</td>
              <td>{{ record.LastLogin }}</td>
              <td>{{ record.PaymentMethod }}</td>
            </tr>
          </tbody>
        </table>
        <nav
          aria-label="breadcrumb"
          v-if="records.length > 20"
          class="mt-3 mb-5 d-flex align-self-center justify-self-center"
        >
          <ol class=" breadcrumb">
            <li class="breadcrumb-item" v-for="i in numberOfPages" :key="i">
              <a href="#" @click.prevent="updateRecordList(i)">page {{ i }}</a>
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <Spinner size="large" spacing="55" message="Loading..." v-else />
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Spinner from "vue-simple-spinner";
import axios from "axios";
export default {
  name: "Records",
  data: function() {
    return {
      mygender: "",
      mypaymentMethod: "",
      tester: [],
      records: [],
      searchQuery: "",
      recordsPerPage: 20,
      startingIndex: 0,
      loaded: false
    };
  },
  components: {
    FontAwesomeIcon,
    Spinner
  },
  methods: {
    updateRecordList: function(nextIndex) {
      var newStartIndex = nextIndex * 20 - 20;
      var newEndIndex = nextIndex * 20;
      this.startingIndex = newStartIndex;
      this.recordsPerPage =
        newEndIndex > this.records.length ? this.records.length : newEndIndex;
    },
    resetQuery: function() {
      this.searchQuery = "";
      this.$refs.searchQuery.focus();
    }
  },
  mounted: function() {
    let url = "http://api.enye.tech/v1/challenge/records";
    axios
      .get(url)
      .then(response => (this.records = response.data.records.profiles));
    if (this.records) {
      // this.loaded = true;
    }
  },
  computed: {
    sizedRecords: function() {
      return this.records
        .slice(
          this.startingIndex == 1 ? 0 : this.startingIndex,
          this.recordsPerPage
        )
        .sort((a, b) => {
          if (a.FirstName.toLowerCase() < b.FirstName.toLowerCase()) {
            return -1;
          } else {
            return 1;
          }
        });
    },
    filteredRecords: function() {
      const filterCondition = item =>
        item.FirstName.toLowerCase().match(this.searchQuery.toLowerCase()) &&
        true;
      return this.sizedRecords.filter(filterCondition);
    },
    numberOfPages: function() {
      var pages = this.records.length / 20;
      return Math.ceil(pages);
    },
    updatedRecords: function() {
      const updateCondition = item =>
        (this.mygender === "" || item.Gender.match(this.mygender)) &&
        (this.mypaymentMethod === "" ||
          item.PaymentMethod.match(this.mypaymentMethod));
      return this.filteredRecords.filter(updateCondition);
    }
  }
};
</script>
