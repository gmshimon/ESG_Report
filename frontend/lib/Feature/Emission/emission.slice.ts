import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ESGRecords, ESGState } from './emission.types'
import { createESGRecord, fetchESGRecords } from './emission.thunk'

const initialState:ESGState = {
        entries: null,
       fetchReportLoading: false,
       fetchReportError: false,
       fetchReportSuccess: false,
   
       createReportLoading: false,
       createReportError: false,
       createReportSuccess: false,
   
       generateStrategiesLoading: false,
       generateStrategiesError: false,
       generateStrategiesSuccess: false,
   
       selectStrategyLoading: false,
       selectStrategyError: false,
       selectStrategySuccess: false,
   
       errorMessage: undefined,
}

const esgSlice = createSlice({
    name: 'esg',
    initialState,
    reducers: {
        resetESGState: state => {
            state.fetchReportLoading = false
            state.fetchReportError = false
            state.fetchReportSuccess = false

            state.createReportLoading = false
            state.createReportError = false
            state.createReportSuccess = false

            state.generateStrategiesLoading = false
            state.generateStrategiesError = false
            state.generateStrategiesSuccess = false

            state.selectStrategyLoading = false
            state.selectStrategyError = false
            state.selectStrategySuccess = false

            state.errorMessage = undefined
        }
    },
    extraReducers: builder => {
        builder
        .addCase(createESGRecord.pending, state => {
            state.createReportLoading = true
            state.createReportError = false
            state.createReportSuccess = false
        })
        .addCase(createESGRecord.fulfilled, (state, action: PayloadAction<ESGRecords>) => {
            state.createReportLoading = false
            state.createReportError = false
            state.createReportSuccess = true
            state.entries?.push(action.payload)
        })
        .addCase(createESGRecord.rejected, (state, action: PayloadAction<string | undefined>) => {
            state.createReportLoading = false
            state.createReportError = true
            state.createReportSuccess = false
            state.errorMessage = action.payload
        }) 
        .addCase(fetchESGRecords.pending, state => {
            state.fetchReportLoading = true
            state.fetchReportError = false
            state.fetchReportSuccess = false
        })
        .addCase(fetchESGRecords.fulfilled, (state, action: PayloadAction<ESGRecords[]>) => {
            state.fetchReportLoading = false
            state.fetchReportError = false
            state.fetchReportSuccess = true
            state.entries = action.payload
        })
        .addCase(fetchESGRecords.rejected, (state, action: PayloadAction<string | undefined>) => {
            state.fetchReportLoading = false
            state.fetchReportError = true
            state.fetchReportSuccess = false
            state.errorMessage = action.payload
        })
    }
})

export const { resetESGState } = esgSlice.actions
export default esgSlice.reducer