from datetime import date

ROLES = ('Student/Alumni', 'Higher Studies Coordinator', 'Administrator')
ADMISSION = ('Applied', 'Offer Received', 'Admitted', 'Rejected', 'Deferred')
PROGRESSION = ('Not Started', 'Ongoing', 'Completed', 'Discontinued')
VERIFICATION = ('Draft', 'Submitted', 'Verified', 'Correction Required')
PROGRESS_EDGES = {
    'Not Started': {'Ongoing', 'Discontinued'},
    'Ongoing': {'Completed', 'Discontinued'},
    'Completed': set(), 'Discontinued': set(),
}

class AppError(Exception):
    def __init__(self, code, message, status=400):
        super().__init__(message)
        self.code, self.message, self.status = code, message, status

def fail(code, message, status=400):
    raise AppError(code, message, status)

def required(value, name):
    if value is None or str(value).strip() == '':
        fail('VALIDATION_ERROR', f'{name} is required.', 422)
    return str(value).strip()

def choice(value, options, name):
    value = required(value, name)
    if value not in options:
        fail('VALIDATION_ERROR', f'{name} must be one of: {", ".join(options)}.', 422)
    return value

def valid_date(value, name):
    value = required(value, name)
    try:
        date.fromisoformat(value)
    except ValueError:
        fail('VALIDATION_ERROR', f'{name} must be a valid YYYY-MM-DD date.', 422)
    return value

def transition(current, action):
    edges = {'Draft': {'submit': 'Submitted'}, 'Correction Required': {'edit': 'Draft', 'submit': 'Submitted'},
             'Submitted': {'verify': 'Verified', 'correct': 'Correction Required'},
             'Verified': {'edit': 'Draft'}}
    result = edges.get(current, {}).get(action)
    if not result:
        fail('INVALID_STATE_TRANSITION', f'The record cannot {action} from {current}.', 409)
    return result

def progress_transition(current, new):
    choice(new, PROGRESSION, 'Progression status')
    if new not in PROGRESS_EDGES.get(current, set()):
        fail('INVALID_STATE_TRANSITION', f'Progression cannot move from {current} to {new}.', 409)
    return new
